// LEO FIX THIS
import { handlePostPost } from "../../routeHandlers/user/postHandler.js"
import { handleHome } from '../../routeHandlers/homeHandler.js';
const postTitle = document.getElementById("title");
const postBody = document.getElementById("mainBody");
const shareButton = document.getElementById("standardButton");

shareButton.addEventListener("click", async () => {
    const req = {
        body: {
            postHeader: postTitle.value,
            postBody: postBody.value
        }
    }
    // wait for the handle to handle the post request
    await handlePostPost(req, res);
    if (res.value === "500 Internal Server Error") {
        alert('500 Internal Server Error');
    } 
    else {
        pageRouter.get('/home', handleHome);
    }
});