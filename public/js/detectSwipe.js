import { difference } from './maxmin.js'
import { trigger } from './trigger.js'
import { showProfile } from './profilePanel.js';

let startX = 0;
//get main content area
const target = document.querySelector(".post-board");
//only run if element exists
if(target)
{

    document.addEventListener("touchstart", (e) => {
        //save starting position
        startX = e.touches[0].clientX;
    });
    
    document.addEventListener("touchend", (e) => {
        //get ending position
        const endX = e.changedTouches[0].clientX;
        //calculate swipe difference
        const diff = difference(startX, endX);
        //print distance 
        console.log("swipe diff:", diff);

        //show profile panel if swiped larged enough
        if (trigger(diff))
            {
                showProfile();
            }
    });

    //this is for the mouse
    document.addEventListener("mousedown", (e) => {
        startX = e.clientX;
    });
    document.addEventListener("mouseup", (e) => {

        const endX = e.clientX;
        const diff = difference(startX, endX);
        
        console.log("mouse swipe diff:", diff);
        
        if(trigger(diff)) {
            showProfile();
        }
    });
}


