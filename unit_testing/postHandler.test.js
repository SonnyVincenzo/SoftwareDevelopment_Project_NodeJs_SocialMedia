//i will not use a real database for this
import {describe, it, mock} from 'node:test';
import assert from 'node:assert';
import { createPostDeleteHandler, createPostEditHandler, createPostPostHandler } from '../private/routeHandlers/postHandler.js'
import { create } from 'node:domain';

function createMockResponse(){
    return {
        statusCode: null,
        contentType: null,
        body: '',
        redirectedTo: null,
        writeHead(statusCode, headers){
            this.statusCode = statusCode;
            this.contentType = headers['Content-Type'];
        },

        write(content){this.body += content;},

        end(){},
        redirect(url){this.redirectedTo = url;}
    };
}

describe ('handlePostPost', () => {
    it('should redirect to /post?id=1', async() => {
        //fake input
        const req = 
        {
            body: {
                postHeader: 'Hello',
                postText: 'World'
            },
            session: {
                userId: 'test'
            }
        };

        //fake output
        const res = createMockResponse();

        //fake db
        const mockDb = {
            query: async() => {
                return [{insertId: 1}]; // simulating db for success
            }
        }

        const handler = createPostPostHandler(mockDb);
        await handler(req, res);

        //check result
        assert.strictEqual(res.redirectedTo, '/post?id=1');
    });
});

describe('handlePostEdit', () => {
    it('should update own post and redirect to said post', async() => {
        const queries = [];
        const req = {
            body: {
                postId: '1',
                postHeader: 'Updated title',
                postText: 'Updated text'
            },
            session:{userId: 'test'}
        };

        const res = createMockResponse();

        const mockDb = {
            query: async (sql, values) => {
                queries.push({sql, values});

                if(sql.startsWith('SELECT')){
                    return [[{username: 'test'}]];
                }

                return [{affectedRows: 1}];
            }
        };

        const handler = createPostEditHandler(mockDb);
        await handler(req, res);

        assert.strictEqual(res.redirectedTo, '/post?id=1');
        assert.ok(queries.some(query => query.sql.startsWith('UPDATE Posts')));
    });

    it('should not edit someone elses post', async () => {
        const req = {
            body: {
                postId: '1',
                postHeader: 'Updated title',
                postText: 'Updated text'
            },
            session: {userId: 'test'}
        };
        const res = createMockResponse();

        const mockDb = {
            query: async() => {
                return [[{username: 'not_test'}]];
            }
        };

        const handler = createPostEditHandler(mockDb);
        await handler(req, res);

        assert.strictEqual(res.statusCode, 403);
        assert.strictEqual(res.body, 'you can only edit your own posts');
    });
});

describe('handlePostDelete', () => {
    it('should delete your own post and redirect to your user page', async() =>{
        const queries = [];
        const req = {
            body: {postId: '1'},
            session:{userId: 'test'}
        };

        const res = createMockResponse();

        const mockDb = {
            query: async (sql, values) => {
                queries.push({sql, values});

                if(sql.startsWith('SELECT')){
                    return [[{username: 'test'}]];
                }

                return [{affectedRows: 1}];
            }
        };

        const handler = createPostDeleteHandler(mockDb);
        await handler(req, res);

        assert.strictEqual(res.redirectedTo, '/user/test');
        assert.ok(queries.some(query => query.sql.startsWith('DELETE FROM Posts')));
    })
})