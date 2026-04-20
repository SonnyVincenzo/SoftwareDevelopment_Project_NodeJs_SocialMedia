
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
    
        const mock_db = {
            execute: async (sql, params) => {
                if(sql.includes('FROM User WHERE username = ?')){
                    return [[
                        {username: 'unitTest_user', joinDate: '2026-01-01 13:37:00'}
                    ]];
                }
                
                if(sql.includes('FROM Posts')){
                    return [[
                        {
                            id: 1,
                            postHeader: "post header",
                            postText: "post text",
                            postDate: '2026-01-01 13:37:00'
                        }
                    ]];

                }

                return [[]];
            }
        }

        //run the handler
        const handler = createUserGetHandler(mock_db);
        await handler(req, res);
        
        //check that the handler returned what's expected
        assert.strictEqual(statusCode, 200);
        assert.strictEqual(contentType, 'text/html');
        assert.ok(body.includes('<title>Profile Page</title>'));
        assert.ok(body.includes('<h2>Posts</h2>'));
        
    });

    it('should return 404 if user doesnt exist', async () => {
        const req = {params: { username: 'missing_username'}};

        let statusCode = null;
        let contentType = null;
        let body = '';

        const res = {
            writeHead: (status, headers) => {
                statusCode = status;
                contentType = headers['Content-Type'];
            },
            write: (chunk) => {
                body += chunk;
            },
            end: () => {}
        };

        const mock_db = {
            execute: async () => [[]]
        };

        const handler = createUserGetHandler(mock_db);
        await handler(req,res);

        assert.strictEqual(statusCode, 404);
        assert.strictEqual(contentType, 'text/plain');
        assert.strictEqual(body, '404 user not found');
    });
});

