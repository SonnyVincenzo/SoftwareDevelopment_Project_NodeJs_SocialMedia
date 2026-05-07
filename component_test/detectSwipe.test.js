import test from "node:test";
import assert from "node:assert";
import { JSDOM } from "jsdom";

import { difference } from "../public/js/maxmin.js";
import { trigger } from "../public/js/trigger.js";
import { showProfile } from "../public/js/profilePanel.js";

//mock fetch
global.fetch = async () => ({
    //pretend http request succeded
    ok: true,
    //fake Json response
    json: async () => ({
        username: "testUser"
    })
});

test("swipe interaction shows profile panel", async() => {
    //create fake html page with a hidden profile panel
    const dom = new JSDOM (`<div id = "profilePanel" class="hidden"></div>`);
    global.document = dom.window.document;

    const diff = difference(0, 120) //simulate swipe from position 0 -> 120
    const shouldTrigger = trigger(diff);

    //if swipe passes threshold then show profile
    if(shouldTrigger){
        await showProfile();
    }
    //get the updated profile panel
    const panel = document.getElementById("profilePanel");

    //check if the panel is visible by removing hidden class
    assert.strictEqual(panel.classList.contains("hidden"), false);
    //check that panel contains the username from mocked fetch
    assert.ok(panel.innerHTML.includes("testUser"));
})