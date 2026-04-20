const button = document.getElementsByClassName("like");
const likes = document.getElementsByClassName("likes");
for (let i = 0; i < button.length; i++) {
  let currButton = button[i];
  let currLikes = likes[i];
  currButton.addEventListener("click", async () => {
    const postId = currButton.dataset.postId;
    const res = await fetch("/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({postId})
    });
    const data = await res.json();
    currLikes.innerHTML = data.likes;
    
    /*currButton.style.color = "rgba(1, 199, 249, 1)";
    currButton.style.webkitTextStroke = "2px rgba(1, 199, 249, 1)";
    value = parseInt(currLikes.getAttribute('value')) + 1;
    currLikes.setAttribute('value', value)
    currLikes.innerHTML = value;*/
  });
}

const dislikeButton = document.getElementsByClassName("dislike");
const dislikes = document.getElementsByClassName("dislikes");
for (let i = 0; i < button.length; i++) {
  let currDislikeButton = dislikeButton[i];
  let currDislikes = dislikes[i];
  currDislikeButton.addEventListener("click", async () => {
    const postId = currButton.dataset.postId;
    const rest = await fetch("/dislike", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({postId})
    });
    const data = await rest.json();
    currLikes.innerHTML = data.likes;
    
    /*currDislikeButton.style.color = "rgba(1, 199, 249, 1)";
    currDislikeButton.style.webkitTextStroke = "2px rgba(1, 199, 249, 1)";
    value = parseInt(currDislikes.getAttribute('value')) + 1;
    currDislikes.setAttribute('value', value)
    currDislikes.innerHTML = value;*/
  });
}
