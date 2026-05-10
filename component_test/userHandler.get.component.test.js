import { beforeEach, describe, it } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';

import { createTestApp } from './app.test.js';


//creates mock database object for test
function createMockDb(getState) {

    const queries = [];

    return {
        queries,

        execute: async (sql, params) => {

            const state = getState();

            queries.push({ sql, params });

            if (state.shouldFail) {
                throw new Error('DB failure');
            }

            if (sql.includes('FROM users')) {
                if (!state.userExists) {
                    return [[]];
                }

                return [[{
                    username: params[0],
                    joinDate: new Date('2026-04-19')
                }]];
            }

            if (sql.includes('FROM posts')) {
                const username = params[0];
                return [state.posts.filter(post => post.username === username)];
            }

            if (sql.includes('FROM user_likes_dislikes')) {
                const postId = params[0];
                return [state.reactionsByPostId[postId] ?? []];

                const likes = reactions.filter(r => r.type === 'like').length;
                const dislikes = reactions.filter(r => r.type === 'dislike').length;
            }

            return [[]];
        }
    };
}

//create mock database data
describe('User GET component:', () => {

    let dbState;

    const mockDb = createMockDb(() => dbState);
    const app = createTestApp(mockDb);

    beforeEach(() => {
        mockDb.queries.length = 0;

        dbState = {
            userExists: true,
            posts: [],
            reactionsByPostId: {},
            shouldFail: false
        };
    });

    it('should return 200 and render the user page with posts.', async () => {
        dbState.posts = [
            {
                id: 1,
                username: 'blob',
                postHeader: 'Blob is hungry',
                postText: 'Blob demands cookies this instant!',
                postDate: new Date('2026-04-20')
            }
        ];
        dbState.reactionsByPostId = {
            1: [
                { likes: 3, dislikes: 1 }
            ]
        };

        //fake http request
        const res = await request(app)
            .get('/user/blob');

        assert.strictEqual(res.statusCode, 200);
        assert.match(res.headers['content-type'], /text\/html/);

        assert.ok(res.text.includes('@blob'));
        assert.ok(res.text.includes('Blob is hungry'));
        assert.ok(res.text.includes('Blob demands cookies this instant!'));

        //three likes and one dislike
        assert.match(res.text, /class="likes"[^>]*>\s*3\s*<\/span>/);
        assert.match(res.text, /class="dislikes"[^>]*>\s*1\s*<\/span>/);

        assert.ok(mockDb.queries.some(query => query.sql.includes('FROM users')));
        assert.ok(mockDb.queries.some(query => query.sql.includes('FROM posts')));
        assert.ok(mockDb.queries.some(query => query.sql.includes('FROM user_likes_dislikes')));
    });

    //unsafe input that should not be rendered as real html
    it('should escape unsafe characters in user posts.', async () => {
        const unsafeHeader = '<script>alert("bad")</script>';
        const unsafeText = 'text with <b>HTML</b>';

        dbState.posts = [
            {
                id: 2,
                username: 'blob',
                postHeader: unsafeHeader,
                postText: unsafeText,
                postDate: new Date('2026-04-20')
            }
        ];
        dbState.reactionsByPostId = {
            2: []
        };

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

        dbState.userExists = false;


        const res = await request(app)
            .get('/user/missing-user');

        assert.strictEqual(res.statusCode, 404);
        assert.strictEqual(res.text, '404 user not found');
        assert.match(res.headers['content-type'], /text\/plain/);
    });

    it('should return 500 when database fails', async () => {

        const originalError = console.error;
        console.error = () => { };

        try {
            dbState.shouldFail = true;

            const res = await request(app)
                .get('/user/blob');

            assert.strictEqual(res.statusCode, 500);
            assert.strictEqual(res.text, '500 Internal Server Error');
        } finally {
            console.error = originalError;
        }
    });
});