import { btnStatus } from "./reactionFunctions.js";

document.querySelectorAll(".post").forEach(post => {
    
    
    const currButton = post.querySelector(".like");
    const currDislikeButton = post.querySelector(".dislike");
    const currLikes = post.querySelector(".likes");
    const currDislikes = post.querySelector(".dislikes");

    
    btnStatus(post);

    currButton.addEventListener("click", async () => {
        const id = currButton.dataset.postId;
        
        const res = await fetch("/reactions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id, action: "like" })
        });

        const likesData = await res.json();
        post.dataset.userReaction = likesData.userReaction;
        currButton.dataset.userReaction = likesData.userReaction;
        currDislikeButton.dataset.userReaction = likesData.userReaction;
        currLikes.textContent = likesData.likes;
        currDislikes.textContent = likesData.dislikes;
        btnStatus(post);
        console.log();
    });

    currDislikeButton.addEventListener("click", async () => {
        const id = currDislikeButton.dataset.postId;
       
        const rest = await fetch("/reactions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id, action: "dislike" })
        });

        const dislikesData = await rest.json();
        post.dataset.userReaction = dislikesData.userReaction;
        currButton.dataset.userReaction = dislikesData.userReaction;
        currDislikeButton.dataset.userReaction = dislikesData.userReaction;
        currDislikes.textContent = dislikesData.dislikes;
        currLikes.textContent = dislikesData.likes;
        btnStatus(post);
        console.log(dislikesData.userReaction);
    });
});


