//import { response } from "express";


const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn"); 

registerBtn.addEventListener("click", async() => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        //sends data to backend
        const response = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            //converts JS object into Json
            body: JSON.stringify ({
                username: username,
                password: password
            })
        });
//waiting for server response
    const data = await response.json();
    if(response.ok) {
        {
            alert("User created! ID: " + data.userID);
        }
    }
    else 
        {
            alert("Error: " + data.error);
        }
}
    catch(error)
    {
        console.error("Error:", error);
        alert("Something went wrong");
    }
});

loginBtn.addEventListener("click", async() => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try 
    {
        //sends data to backend
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            //converts JS object into Json
            body: JSON.stringify ({
                username: username,
                password: password
            })
        });

        const data = await response.json();

        if(response.ok)
        {

            {
                alert("Login successful! User ID: " + data.userID);
            }
        }
        else 
        {
            alert("Error: " + data.error);
        }
    }
    catch(error)
    {
        console.error("Error:", error);
        alert("Something went wrong");
    }
});