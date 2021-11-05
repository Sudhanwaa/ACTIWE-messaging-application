const socket = io('http://localhost:3000');

//Global object for a single user
const user = {
    name: "",
    username: "",
    language: "",
    translation: false,
    chatId: ""
};

//Getting user details from login page
const details = new URLSearchParams(window.location.search);
details.forEach( (value,key) => {
    switch(key){
        case "name":
            user.name = value;
            break;
        case "username":
            user.username = value;
            break;
        case "language":
            user.language = value;
    };
} );


/* ========================================================================================== */
/* ========================================================================================== */


/* CHAT AREA JS */


//Toggling the translation feature
const translation_toggle = document.querySelector(".translation-toggle button");
translation_toggle.addEventListener('click', () => {
    //If translation is enabled before click
    if(user.translation === true){

        user.translation = false;

        //Change button styles and state
        translation_toggle.innerText = "OFF";
        translation_toggle.style.color = "black";
        translation_toggle.style.border = "1px solid black"
        translation_toggle.style.backgroundColor = "white";
    }
    //If translation is disabled before click
    else{
        user.translation = true;

        //Change button styles and state
        translation_toggle.innerText = "ON";
        translation_toggle.style.color = "white";
        translation_toggle.style.border = "none"
        translation_toggle.style.backgroundColor = "#2200FF";
    }
});


//Logout button
const logout_button = document.querySelector(".logout");
logout_button.addEventListener('click', () => {
    socket.disconnect();
    window.location.href = "../HTML/index.html";
});

//Messaging JS

socket.on('connect', ()=>{
    user.chatId = socket.id;
});

//Sending a message
const send_button = document.querySelector(".send-button");
send_button.addEventListener('click', ()=>{

    //Text box for message
    const message_box = document.querySelector(".message-box");
    const message_text = message_box.value;

    if(message_text === "") return;

    message_box.value = "";

    //Send message to server
    socket.emit('send-event', 'sent-message', user.username, message_text, user.language);
    //Display message on sender's device
    displayMessage("sent-message", user.username, message_text, user.language);
});

//Receiving a message
socket.on('receive-event', (message_type,sender,message_text,lang_code) => {
    
    //Translating message
    if(user.translation){//Translate text before displaying
        translate_n_display(message_text,user.language,lang_code,message_type,sender);
    }
    else{
        displayMessage(message_type,sender,message_text,lang_code);
    }
    
});


/* CHAT AREA JS END */


/* ========================================================================================== */
/* ========================================================================================== */


/* FUNCTIONS */

//Translate given text
async function translate_n_display(msg, target_lang, src_lang, msg_type,msg_sender){

    /* USING Frengly free translation API */
    let res = await fetch('https://frengly.com/frengly/data/translateREST', {
         method: "POST",
         body: JSON.stringify({
             src: src_lang,
	         dest: target_lang,
	         text: msg,
	         email: 'yash.ukalkar2020@vitbhopal.ac.in',
	         password: 'randompassword'
         }),
         headers: { "Content-Type": "application/json" }
    })
    
    let jsonRes = await res.json();
    let message_text = jsonRes.translation;
    displayMessage(msg_type,msg_sender,message_text);
    
}

//Display sent/received message event
function displayMessage(message_type, sender, message_to_display, lang_code){

    //Message view area container
    const message_area = document.querySelector(".chat-view-area");
    
    //Clear default message if this is first message
    if(message_area.contains(document.querySelector(".default-message"))){
        const default_message = document.querySelector(".default-message");
        default_message.remove();
    }

    //container for a message
    const new_message = document.createElement("div");
    new_message.classList.add("message-container");

    //Name of the sender
    if(sender === user.username){
        sender = "You";
    };
    const sender_name = document.createElement("p");
    sender_name.innerHTML = sender;
    sender_name.classList.add("chat-name");

    //Message to be sent
    const msg = document.createElement("p");
    msg.innerHTML = message_to_display;
    msg.classList.add("message", message_type);
    //Message type is 'received-message' if received

    //Add content to message container
    new_message.appendChild(sender_name);
    new_message.appendChild(msg);

    //Add message to the html file
    message_area.appendChild(new_message);

    //Scroll to this latest message
    message_area.scrollTop = message_area.scrollHeight;
}