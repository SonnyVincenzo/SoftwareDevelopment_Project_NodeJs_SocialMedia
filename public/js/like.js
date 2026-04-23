const button = document.getElementsByClassName("like");
const likes = document.getElementsByClassName("likes");
for (let i = 0; i < button.length; i++) {
  let currButton = button[i];
  let currLikes = likes[i];
  currButton.addEventListener("click", async () => {
    
    currLikes.innerHTML = data.likes;
    currLikes.setAttribute('value', data.likes);
    
    if(currButton.userReaction === 'like') {
      currButton.classList.add('active')
      currButton.style.color = "rgba(1, 199, 249, 1)";
      currButton.style.webkitTextStroke = "2px rgba(1, 199, 249, 1)";
    } else {
      currButton.classList.remove('active');
      currButton.style.color = "" ;
      currButton.style.webkitTextStroke = "2px blueviolet";
    }
  }); 
}

const dislikeButton = document.getElementsByClassName("dislike");
const dislikes = document.getElementsByClassName("dislikes");
for (let i = 0; i < dislikeButton.length; i++) {
  let currDislikeButton = dislikeButton[i];
  let currDislikes = dislikes[i];
  currDislikeButton.addEventListener("click", async () => {
    currDislikeButton.style.color = "rgba(1, 199, 249, 1)";
    currDislikeButton.style.webkitTextStroke = "2px rgba(1, 199, 249, 1)";
    value = parseInt(currDislikes.getAttribute('value')) + 1;
    currDislikes.setAttribute('value', value)
    currDislikes.innerHTML = value;
  });
}
