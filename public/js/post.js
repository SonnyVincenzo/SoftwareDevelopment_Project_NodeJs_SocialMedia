// LEO FIX THIS
const postTitle = document.getElementById("title");
const postBody = document.getElementById("mainBody");
const shareButton = document.getElementById("standardButton");

shareButton.addEventListener("click", async () => {
    try {
        const respones = await fetch('/api/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                postHeader: postTitle.value,
                postBody: postBody.value
            })
        });

        if (!respones.ok){
            alert('500 Internal Server Error');
            return;
        }
        window.location.href = '/home';
    } catch (error) {
        console.error(error);
        alert('Something went Wrong!')
    // wait for the handle to handle the post request
    //await handlePostPost(req, res);
        pageRouter.get('/home', handleHome);
    }
});