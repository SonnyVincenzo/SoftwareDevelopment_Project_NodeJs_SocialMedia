import { showProfile } from "./profilePanel.js";

let startX = 0;

const target = document.querySelector(".post-board");
if(target)
{
    document.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    });
    
    document.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;

    console.log("swipe diff:", diff);

    //swipe right threshold
    if(diff > 80) {
        showProfile();
    }
});

    document.addEventListener("mousedown", (e) => {
        startX = e.clientX;
    });
    document.addEventListener("mouseup", (e) => {
        const endX = e.clientX;
        const diff = endX - startX;
        
        console.log("mouse swipe diff:", diff);
        
        if(diff > 80) {
            showProfile();
        }
    });


}


