//i will not use a real database for this
import {describe, it} from 'node:test';
import assert from 'node:assert';
import { createPostPostHandler } from '../private/routeHandlers/postHandler.js'

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
        //fake db
        const mockDb = {
            query: (sql, values, callback) => {
                callback(null, {insertId: 1}); // simulating db for success
            }
        }

        const handler = createPostPostHandler(mockDb);
        await handler(req, res);

        //check result
        assert.strictEqual(redirectedTo, '/post?id=1');
    });
});