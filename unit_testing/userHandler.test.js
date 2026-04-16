
import { describe, it } from 'node:test';
import assert from 'node:assert';
import { createUserGetHandler } from '../private/routeHandlers/user/userHandler.js';

describe('createUserGetHandler', () => {
    it('should return a user profile page as HTML', async () => {
        //fake profile page request with testuser
        const req = { params: {username: 'testuser' }};
        
        //variables for handler response
        let statusCode = null;
        let contentType = null;
        let body = '';

        //fake response by sendWebResponse()
        const res = { writeHead: (status, headers) => { statusCode = status; contentType = headers['Content-Type']; },
            write: (chunk) => { body += chunk; },
            end: () => {}
        };
    

        //run the handler
        const handler = createUserGetHandler({});
        await handler(req, res);
        
        //check that the handler returned what's expected
        assert.strictEqual(statusCode, 200);
        assert.strictEqual(contentType, 'text/html');
        assert.ok(body.includes('<title>Profile Page</title>'));
        assert.ok(body.includes('<h2>Posts</h2>'));
        
    });
});

