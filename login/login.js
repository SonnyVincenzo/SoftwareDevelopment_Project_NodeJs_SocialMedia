const username_password_submit = document.getElementById("submit"); 
let username;
let password;


username_password_submit.onclick = function()
{
    //event.preventDefault(); //stops page from reload
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

  

        //check if the user already exist in database
        //if not then create a user

        window.prompt("You don't have a username, press create user when you entered name and password");
        const new_username = document.getElementById("createuser");
        console.log("User pressed createUser");
}