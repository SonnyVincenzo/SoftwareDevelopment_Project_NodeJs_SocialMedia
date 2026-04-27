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
    const postId = currButton.dataset.id ;
    const res = await fetch("/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({postId, action: "like"})
    });
    const data = await res.json();

    if(currButton.dataset.userReaction === 'like') {
      currButton.dataset.userReaction = 'none';
      let value = parseInt(currLikes.getAttribute('value')) - 1;
        currLikes.setAttribute('value', value)
        currLikes.innerHTML = value;
        currButton.classList.remove('active');
        currButton.style.color = "" ;
        currButton.style.webkitTextStroke = "2px blueviolet";
    } else {
      currButton.dataset.userReaction = 'like'
      currButton.classList.add('active')
      let value = parseInt(currLikes.getAttribute('value')) + 1;
        currLikes.setAttribute('value', value)
        currLikes.innerHTML = value;
        currButton.style.color = "rgba(1, 199, 249, 1)";
        currButton.style.webkitTextStroke = "2px rgba(1, 199, 249, 1)";
    }
  }); 

  currDislikeButton.addEventListener("click", async () => {
    if(currDislikeButton.dataset.userReaction === 'dislike') {
      currDislikeButton.dataset.userReaction = 'none';
      let value = parseInt(currDislikes.getAttribute('value')) - 1;
        currDislikes.setAttribute('value', value)
        currDislikes.innerHTML = value;
        currDislikeButton.classList.remove('active');
        currDislikeButton.style.color = "" ;
        currDislikeButton.style.webkitTextStroke = "2px blueviolet";
    } else {
      currDislikeButton.dataset.userReaction = 'dislike'
      currDislikeButton.classList.add('active')
      let value = parseInt(currDislikes.getAttribute('value')) + 1;
        currDislikes.setAttribute('value', value)
        currDislikes.innerHTML = value;
        currDislikeButton.style.color = "rgba(1, 199, 249, 1)";
        currDislikeButton.style.webkitTextStroke = "2px rgba(1, 199, 249, 1)";
    }
  });
}


const postId = currButton.dataset.postId;
    
    const postId = currDislikeButton.dataset.postId;
    const rest = await fetch("/dislike", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({postId})
    });
    const data = await rest.json();
    currDislikes.innerHTML = data.likes;