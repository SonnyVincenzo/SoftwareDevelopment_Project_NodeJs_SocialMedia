const input = document.getElementById("input");
const postButton = document.getElementById("postButton");
const output = document.getElementById("output");
const feeds = [];
let feedNumber = 0;
let selectedFeedNumber = 0;
let selected

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        postButton.click();
    }
});

postButton.onclick = () => {
    console.log(input.value);

    const post = document.createElement("p");
    post.textContent = input.value;
    post.offset = feedNumber;
    post.onclick = () => {
        console.log(post.feedNumber);
        const postPost = document.createElement("p");
        postPost.textContent = input.value;
        postPost.offset = post.childElementCount;
        console.log("added child as offset" + postPost.offset);

        post.appendChild(postPost);
    }

    feeds[feedNumber] = post;
    feedNumber++;
    output.appendChild(post);
    input.value = null;
}
