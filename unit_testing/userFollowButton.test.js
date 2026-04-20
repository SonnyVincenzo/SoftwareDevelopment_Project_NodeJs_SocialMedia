import {describe, it} from 'node:test';
import assert from 'node:assert';
import { buttonState } from '../public/js/user.js';

describe("Follow Button", ()=>{
    it("button should say 'following' when clicked",()=>{
        const result = buttonState(true, false);
        assert.strictEqual(result, "Following");
    });

    it("should return 'Stop Following' when hovering over it",()=>{
        const result = buttonState(true, true); 
        assert.strictEqual(result, "Stop Following");
    });

    it("should only say 'Follow' when in unfollowed state",()=>{
        const result = buttonState(false, false);
        assert.strictEqual(result, "Follow");
    });
    
});