const button = document.getElementsByClassName("like");
const likes = document.getElementsByClassName("likes");
const dislikeButton = document.getElementsByClassName("dislike");
const dislikes = document.getElementsByClassName("dislikes");
for (let i = 0; i < button.length; i++) {
  let currButton = button[i];
  let currLikes = likes[i];
  let currDislikeButton = dislikeButton[i];
  let currDislikes = dislikes[i];

  currButton.addEventListener("click", async () => { 
    const id = currButton.dataset.postId;
    const res = await fetch("/reactions",  {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({id, action: "like"})
    });
    const likesData = await res.json();
    currLikes.innerHTML = likesData.likes;
    currDislikes.innerHTML = likesData.dislikes;
    if(likesData.userReaction === "like" ){
      currButton.style.color = "rgba(1, 199, 249, 1)";
      currButton.style.webkitTextStroke = "2px rgba(1, 199, 249, 1)";
      currDislikeButton.style.color = "" ;
      currDislikeButton.style.webkitTextStroke = "2px blueviolet";
    } else {
      currButton.style.color = "" ;
      currButton.style.webkitTextStroke = "2px blueviolet";
    }
  }); 

  currDislikeButton.addEventListener("click", async () => {
    const id = currDislikeButton.dataset.postId;
      const rest = await fetch("/reactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({id, action: "dislike"})
      });
      const dislikesData = await rest.json();
      currDislikes.innerHTML = dislikesData.dislikes;
      currLikes.innerHTML = dislikesData.likes;
    if(dislikesData.userReaction === 'dislike') {
      currDislikeButton.style.color = "rgba(1, 199, 249, 1)";
      currDislikeButton.style.webkitTextStroke = "2px rgba(1, 199, 249, 1)";  
      currButton.style.color = "" ;
      currButton.style.webkitTextStroke = "2px blueviolet";
    } else {
      currDislikeButton.style.color = "" ;
      currDislikeButton.style.webkitTextStroke = "2px blueviolet";
    }
  });
}


