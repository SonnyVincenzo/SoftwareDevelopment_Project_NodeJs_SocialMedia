import { describe, it } from 'node:test';
import assert from 'node:assert';
import * as postMethods from '../private/methods/post/postMethods.js';

describe('Methods Post: postMethods.js', () => {

    describe('formatPostToHtml', () => {

        const mockDb = {
            execute: async (query, params) => {
                if (query.includes('SUM(type = \'like\')')) {
                    return [[{
                        likes: 5,
                        dislikes: 2
                    }]];
                }
                if (query.includes('SELECT type FROM user_likes_dislikes')) {
                    return [[{
                        type: 'like'
                    }]];
                }
                throw new Error('Unknown query');
            }
        };

        const mockPosts = [
            {
                id: 1,
                postHeader: 'Hello <World>',
                username: 'john&doe',
                postDate: '2024-01-01T12:00:00Z',
                postText: 'Text with <b>bold</b> & special chars'
            }
        ];

        it('should format posts.', async () => {
            const html = await postMethods.formatPostToHtml(mockDb,mockPosts,'john&doe');

            assert.ok(html.includes('<article class="post"'));
            assert.ok(html.includes('<p class="title">'));

            assert.ok(html.includes('Hello &lt;World&gt;'));
            assert.ok(html.includes('Text with &lt;b&gt;bold&lt;/b&gt; &amp; special chars'));

            assert.ok(html.includes('/user/john%26doe'));

            assert.ok(html.includes('class="like"'));
            assert.ok(html.includes('class="dislike"'));

            assert.ok(html.includes('>5</span>'));
            assert.ok(html.includes('>2</span>'));

            assert.ok(html.includes('data-user-reaction="like"'));
        });

        it('should use "none" when user is not logged in.', async () => {
            const html = await postMethods.formatPostToHtml(mockDb, mockPosts, null);

            assert.ok(html.includes('data-user-reaction="none"'));
        });

    });

});