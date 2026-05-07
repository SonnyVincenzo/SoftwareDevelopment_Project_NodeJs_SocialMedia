import {describe, it} from 'node:test';
import assert from 'node:assert';
import express from 'express';
import request from 'supertest';

import {createTestApp} from './app.test.js';
import createUserRouter from '../private/routers/userRouter.js';


//creates mock database object for test
function createMockDb({ userExists = true, posts = [], reactionsByPostId = {} } = {}){

    const queries = [];

    return{
        queries,

        execute: async(sql, params) => {
            queries.push({sql, params});

            if(sql.includes('FROM User')){
                if(!userExists){
                    return [[]];
                }

                return [[{
                    username: params[0],
                    joinDate: new Date('2026-04-19')
                }]];
            }

            if(sql.includes('FROM Posts')){
                const username = params[0];
                return [posts.filter(post => post.username === username)];
            }

            if(sql.includes('FROM userLikesDislikes')){
                const postId = params[0];
                return [reactionsByPostId[postId] ?? []];
            }

            return [[]];
        }
    };
}

//create mock database data
describe('User GET component:', () => {
    it('should return 200 and render the user page with posts.', async () => {
        const mockDb = createMockDb({
            userExists: true,
            posts: [
                {
                    id: 1,
                    username: 'blob',
                    postHeader: 'Blob is hungry',
                    postText: 'Blob demands cookies this instant!',
                    postDate: new Date('2026-04-20')
                }
            ],
            reactionsByPostId:{
                1: [
                    {type: 'like'},
                    {type: 'dislike'},
                    {type: 'like'},
                    {type: 'like'}
                ]
            }
        });

        //create fake express app
        const app = createTestApp(mockDb);
        app.use('/user', createUserRouter(mockDb));

        //fake http request
        const res = await request(app)
            .get('/user/blob');

        assert.strictEqual(res.statusCode, 200);
        assert.match(res.headers['content-type'], /text\/html/);

        assert.ok(res.text.includes('@blob'));
        assert.ok(res.text.includes('Blob is hungry'));
        assert.ok(res.text.includes('Blob demands cookies this instant!'));

        //three likes and one dislike
        assert.match(res.text, /class="likes"[^>]*>\s*3\s*<\/p>/);
        assert.match(res.text, /class="dislikes"[^>]*>\s*1\s*<\/p>/);

        assert.ok(mockDb.queries.some(query => query.sql.includes('FROM User')));
        assert.ok(mockDb.queries.some(query => query.sql.includes('FROM Posts')));
        assert.ok(mockDb.queries.some(query => query.sql.includes('FROM userLikesDislikes')));
    });

    //unsafe input that should not be rendered as real html
    it('should escape unsafe characters in user posts.', async () => {
        const unsafeHeader = '<script>alert("bad")</script>';
        const unsafeText = 'text with <b>HTML</b>';

        const mockDb = createMockDb({
            userExists: true,
            posts: [
                {
                    id: 2,
                    username: 'blob',
                    postHeader: unsafeHeader,
                    postText: 'text with <b>HTML</b>',
                    postDate: new Date('2026-04-20')
                }
            ],
            reactionsByPostId:{
                2: []
            }
        });

        //create test express app
        const app = createTestApp(mockDb);
        app.use('/user', createUserRouter(mockDb));

        const res = await request(app)
            .get('/user/blob');

        assert.strictEqual(res.statusCode, 200);

        //raw unsafe html should not appear on webpage
        assert.ok(!res.text.includes(unsafeHeader));
        assert.ok(!res.text.includes(unsafeText));
        //safe version should appear instead
        assert.ok(res.text.includes('&lt;script&gt;alert(&quot;bad&quot;)&lt;/script&gt;'));
        assert.ok(res.text.includes('text with &lt;b&gt;HTML&lt;/b&gt;'));
    });

    it('should return 404 when user doesnt exist', async () => {
        const mockDb = createMockDb({
            userExists: false
        });

        const app = createTestApp(mockDb);
        app.use('/user', createUserRouter(mockDb));

        const res = await request(app)
            .get('/user/missing-user');

        assert.strictEqual(res.statusCode, 404);
        assert.strictEqual(res.text, '404 user not found');
        assert.match(res.headers['content-type'], /text\/plain/);
    });

    it('should return 500 when database fails', async () => {

        const originalError = console.error;
        console.error = () => {};

        try{
            const failingDb = {
                execute: async () => {
                    throw new Error('DB failure');
                }
            };

            const app = createTestApp(failingDb);
            app.use('/user', createUserRouter(failingDb));

            const res = await request(app)
                .get('/user/blob');

            assert.strictEqual(res.statusCode, 500);
            assert.strictEqual(res.text, '500 Internal Server Error');
        }   finally{
            console.error = originalError;
        }
    });
});