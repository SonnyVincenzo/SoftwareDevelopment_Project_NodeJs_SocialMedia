import { getLoggedInUser } from "./userState.js";

export async function showProfile()
{
    const panel = document.getElementById("profilePanel");

    if(!panel){
        console.log("panel missing");
        return;
    }
    const user = await getLoggedInUser();

    console.log("user;", user);

    if(!user) {
        panel.innerHTML = `<h2>not logged in</h2>`;
    }
    else {
        panel.innerHTML = `<h2>${user.username}</h2>`;
    }
    panel.classList.remove("hidden");
}