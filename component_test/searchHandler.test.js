import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'fs/promises';
import createSearchHandler from "../private/routeHandlers/searchHandler.js";
//mock readFile to prevent test to try to load a real html file.
fs.readFile =async () => "<html>%%searchResult%%</html>";
//function to simulate express res object
function mockResponse()
{
    //variable to track if res.send() gets called
    let sendCalled = false;
    return {
        //fake send() method -> sends flag when called
        send: () => { sendCalled = true; },
        // fake redirect() method
        redirect: () => {},
        //fake status() method -> returns object with send()
        status: () => ({send: () => {} }),
        //helper method so i can check if send() was called
        getsendCalled: () => sendCalled
    };
}
//define a test case. i will change the name of the output soon
test('should return results when query exists', async() =>{
    //mock db with two calls (user + posts)
    const db = {
        //fake execute function to simulate sql queries
        execute: async (sql) => {
            //if query is checking users then 
            if (sql.includes("User")) {
                return [[]]; //no user found
            }
            //otherwise return fake post data
            return [[{id: 1, postHeader: "Test post"}]]; // post found
        }
    };
    //create the handler with the mocked database
    const handler = createSearchHandler(db);
    //simulate request with query parameter ?q=test
    const req = {query : {q: "test"}};
    //create fake response
    const res = mockResponse();
    //run the handler
    await handler(req,res);

    //assert result 
    assert.strictEqual(res.getsendCalled(), true);
})