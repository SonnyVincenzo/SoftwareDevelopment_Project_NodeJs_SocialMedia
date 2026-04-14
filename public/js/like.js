const button = document.getElementsByClassName("like");
const likes = document.getElementsByClassName("likes");
for (let i = 0; i < button.length; i++) {
  let currButton = button[i];
  let currLikes = likes[i];
  currButton.addEventListener("click", () => {
    console.log(button);
    currButton.style.color = "rgba(1, 199, 249, 1)";
    value = parseInt(currLikes.getAttribute('value')) + 1;
    currLikes.setAttribute('value', value)
    currLikes.innerHTML = value;
  });
}