import {describe, it} from 'node:test';
import assert from 'node:assert';
import { JSDOM } from 'jsdom';

const dom = new JSDOM(`<!DOCTYPE html><body></body>`);
global.document = dom.window.document;
global.window = dom.window;

describe("Button tests", () => {
    it("Like Button test", () => {
        document.body.innerHTML = `<button class="like" data-user-id="" data-user-reaction="none">  &#10084; </button>
        <span class="likes" value="0" >0</span>`;
        const button = document.getElementsByClassName("like")[0];
        let callCount = 0;
        const likeTest = () => {
            callCount++;
        };     
        
        button.addEventListener("click", likeTest);
        button.click();
        assert.strictEqual(callCount, 1 );
    })       

    it("Unlike Button test", () => {
        document.body.innerHTML = `
        <button class="like" data-user-id="" data-user-reaction="none">  &#10084; </button>
        <span class="likes" value="0" >0</span>`;
        const button = document.getElementsByClassName("like")[0];
        const likes = document.getElementsByClassName("likes")[0];
        
        const UnlikeTest = () => {
            let value = parseInt(likes.textContent);
            if(button.dataset.userReaction === 'like') {
                button.dataset.userReaction = 'none' ;
                value--;
                button.classList.remove("active");
            } else {
                button.dataset.userReaction = 'like' ;
                value++;
                button.classList.add("active");
            }
            likes.textContent = value ;
        };     
        
        button.addEventListener("click", UnlikeTest);
        button.click();
        assert.strictEqual(parseInt(likes.textContent), 1 );
        button.click();
        assert.strictEqual(parseInt(likes.textContent), 0 );
    })  


    it("Dislike Button test", () => {
        document.body.innerHTML = `<button class="dislike" data-user-id="" data-user-reaction="none"> &#10006; </button>`;
        const dislikeButton = document.getElementsByClassName("dislike")[0];
        let dislikeCallCount = 0;
        const dislikeTest = () => {
            dislikeCallCount++;
        }; 

        dislikeButton.addEventListener("click", dislikeTest);
        dislikeButton.click();
        assert.strictEqual(dislikeCallCount, 1 );
    }) 
    
    it("Undislike Button test", () => {
        document.body.innerHTML = `
        <button class="dislike" data-user-id="" data-user-reaction="none"> &#10006; </button>
        <span class="dislikes" >0</span>`;
        const dislikeButton = document.getElementsByClassName("dislike")[0];
        const dislikes = document.getElementsByClassName("dislikes")[0];
        
        const UndislikeTest = () => {
            let value = parseInt(dislikes.textContent);
            if(dislikeButton.dataset.userReaction === 'dislike') {
                dislikeButton.dataset.userReaction = 'none' ;
                value--;
                dislikeButton.classList.remove("active");
            } else {
                dislikeButton.dataset.userReaction = 'dislike' ;
                value++;
                dislikeButton.classList.add("active");
            }
            dislikes.textContent = value ;
        };     
        
        dislikeButton.addEventListener("click", UndislikeTest);
        dislikeButton.click();
        assert.strictEqual(parseInt(dislikes.textContent), 1 );
        dislikeButton.click();
        assert.strictEqual(parseInt(dislikes.textContent), 0 );
    }) 
});