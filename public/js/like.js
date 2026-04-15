const button = document.getElementsByClassName("like");
const likes = document.getElementsByClassName("likes");
for (let i = 0; i < button.length; i++) {
  let currButton = button[i];
  let currLikes = likes[i];
  currButton.addEventListener("click", () => {
    currButton.style.color = "rgba(1, 199, 249, 1)";
    currButton.style.webkitTextStroke = "2px rgba(1, 199, 249, 1)";
    value = parseInt(currLikes.getAttribute('value')) + 1;
    currLikes.setAttribute('value', value)
    currLikes.innerHTML = value;
  });
}

const dislikeButton = document.getElementsByClassName("dislike");
const dislikes = document.getElementsByClassName("dislikes");
for (let i = 0; i < button.length; i++) {
  let currDislikeButton = dislikeButton[i];
  let currDislikes = dislikes[i];
  currDislikeButton.addEventListener("click", () => {
    currDislikeButton.style.color = "rgba(1, 199, 249, 1)";
    currDislikeButton.style.webkitTextStroke = "2px rgba(1, 199, 249, 1)";
    value = parseInt(currDislikes.getAttribute('value')) + 1;
    currDislikes.setAttribute('value', value)
    currDislikes.innerHTML = value;
  });
}
