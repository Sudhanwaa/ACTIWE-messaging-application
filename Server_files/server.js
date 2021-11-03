const io = require('socket.io')(3000, {
    cors: {
        origin: "http://127.0.0.1:5500",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {

    //Event for when any user sends a message
    socket.on('send-event', (message_type,sender,message_text) => {
        if(message_type === 'sent-message')
            message_type = 'received-message';

        //Sending the message to other users
        socket.broadcast.emit('receive-event', message_type,sender,message_text);
    });
});