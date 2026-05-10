

export function btnStatus(post) {
    const state = post.dataset.userReaction;
    const currButton = post.querySelector(".like");
    const currDislikeButton = post.querySelector(".dislike");
    
    const btnActive = (button) => {
        button.style.color = "rgba(1, 199, 249, 1)";
        button.style.webkitTextStroke = "2px rgba(1, 199, 249, 1)";
    }
    const neutral = (button) => {
        button.style.color = "";
        button.style.webkitTextStroke = "2px blueviolet";
    }

    const selectState = (state) => {
        neutral(currButton);
        neutral(currDislikeButton);

        if(state === "like") {
            btnActive(currButton);
            neutral(currDislikeButton);
        } else if (state === "dislike") {
            btnActive(currDislikeButton);
            neutral(currButton);
        } else {
            neutral(currButton);
            neutral(currDislikeButton);
        }
    }
    selectState(state);
}
