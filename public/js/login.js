// Potential use of frontend login implementation (I question necessity) -LJ.


// const loginBtn = document.getElementById("loginBtn");
// const registerBtn = document.getElementById("registerBtn"); 

// //login - sckika information till mysqlserver
// loginBtn.onclick = async function()
// {
//     //let formData = ;
//     const username = document.getElementById("username").value;
//     const password = document.getElementById("password").value;

//     const response = await fetch("http://localhost:5000/login", {
//         method: "Post",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({username, password})
//     });
//     const data = await response.json();
//     if(response.ok)
//     {
//         alert("Login Successful");
//     }
//     else 
//     {
//         alert(data.error);
//     }
// }

// //registerBtn
// registerBtn.onclick = async function()
// {
//     const username = document.getElementById("username").value;
//     const password = document.getElementById("password").value;

//     const response = await fetch("http://localhost:5000/register", {
//         method: "Post",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify ({username, password})
//     });
//     const data = await response.json();
//     if(response.ok)
//     {
//         alert("New User have been Created");
//     }
//     else 
//     {
//         alert(data.error);
//     }
// }

// console.log("It works");