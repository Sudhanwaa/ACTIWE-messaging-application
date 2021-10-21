
//Global user object for one client
const user = {
    name:"",
    username:"",
    language:""
};

//Log in page section

/* NAVLINKS */
const about_link = document.querySelector(".about-link");
const underline = document.querySelector(".underline");
const github_link = document.querySelector(".github-repo-link img");

about_link.addEventListener('mouseover', function(){
    underline.style.width = "120%";
});
about_link.addEventListener('mouseout', function(){
    underline.style.width = "0";
});

github_link.addEventListener('mouseover', function(){
    github_link.style.width = "37px";
    about_link.style.paddingLeft = "7px";
});
github_link.addEventListener('mouseout', function(){
    github_link.style.width = "35px";
    about_link.style.paddingLeft = "10px";
});

/* NAVLINKS END */

const name_field = document.querySelector("#name-field");
const username_field = document.querySelector("#username-field");
const language_field = document.querySelector("#default-language");

const login_button = document.querySelector(".login-button");
//Add event to transfer 'user' object to main chat page JS file
login_button.addEventListener('click', function(){});

//Log in page section END

/*===========================================================================================================*/
/*===========================================================================================================*/