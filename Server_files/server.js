
const io = require('socket.io')(3000, {
    cors: {
        origin: "http://127.0.0.1:5500",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {

    console.log(`New user: ${socket.id}`);

    //Event for when any user sends a message
    socket.on('send-event', (message_type,sender,message_text,lang_code) => {
        message_type = 'received-message';

        //Sending the message to other users
        socket.broadcast.emit('receive-event', message_type,sender,message_text,lang_code);
    });

    //Event for when a user disconnects
    socket.on('disconnect', () => {
        console.log(`User disconnect: ${socket.id}`);
        socket.disconnect();
    });

});