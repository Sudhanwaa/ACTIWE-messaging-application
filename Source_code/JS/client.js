
//Global object for a single user
const user = {
    name: "",
    username: "",
    language: ""
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

