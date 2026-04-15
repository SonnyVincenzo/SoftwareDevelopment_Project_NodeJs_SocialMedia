//checks if the data was saved in database
import {describe, it} from 'node:test';
import assert from 'node:assert';
import { handlePostPost } from '../private/routeHandlers/postHandler.js'

describe ('handlePostPost', () => {
    it('should redirect to /post?id=1', async() => {
        //fake input
        const req = 
        {
            body: {
                postHeader: 'Hello',
                postText: 'World'
            }
        };
        //variable to capture result
        let redirectedTo = null;
        //fake output
        const res = {
            redirect: (url) => {
                redirectedTo = url;
            }
        };
        //run the function
        await handlePostPost(req, res);

        //check result
        assert.strictEqual(redirectedTo, '/post?id=1');
    });
});