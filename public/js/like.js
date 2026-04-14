const button = document.getElementsByClassName("like");
for (let i = 0; i < button.length; i++) {
  let currButton = button[i];
  currButton.addEventListener("click", () => {
    console.log(button);
    currButton.style.color = "rgba(1, 199, 249, 1)";

  });

}

console.log("Js loded");