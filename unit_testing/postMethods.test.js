/*import { describe, it } from 'node:test';
import assert from 'node:assert';
import * as postMethods from '../private/methods/postMethods.js';

describe('Methods Post: postMethods.js:', () => {

    describe('replaceDangerousChars', () => {

        it('should escape HTML special characters correctly.', () => {
            const input = `Astarion & Cazador <script>"test"</script>'`;
            const output = postMethods.replaceDangerousChars(input);

            assert.strictEqual(output, 'Astarion &amp; Cazador &lt;script&gt;&quot;test&quot;&lt;/script&gt;&#39;');
        });

        it('should handle non-string input by converting to string.', () => {
            const input = 123;
            const output = postMethods.replaceDangerousChars(input);

            assert.strictEqual(output, '123');
        });
    });

    describe('formatPostToHtml', () => {

        const mockPosts = [
            {
                postHeader: 'Hello <World>',
                username: 'john&doe',
                postDate: '2024-01-01T12:00:00Z',
                postText: 'Text with <b>bold</b> & special chars'
            }
        ];

        it('should format posts for user endpoint.', () => {
            const html = postMethods.formatPostToHtml(mockPosts, 'user');

            assert.ok(html.includes('<article class="post">'));
            assert.ok(html.includes('<h2 class="title">'));
            assert.ok(html.includes('Hello &lt;World&gt;'));
            assert.ok(html.includes('/user/john%26doe'));
            assert.ok(html.includes('Text with &lt;b&gt;bold&lt;/b&gt; &amp; special chars'));
            assert.ok(html.includes('class="like"'));
            assert.ok(html.includes('class="dislike"'));
        });

        it('should format posts for home endpoint.', () => {
            const html = postMethods.formatPostToHtml(mockPosts, 'home');

            assert.ok(html.includes('<article class="post">'));
            assert.ok(html.includes('<p class="title">'));
            assert.ok(html.includes('Hello &lt;World&gt;'));
            assert.ok(html.includes('/user/john%26doe'));
            assert.ok(html.includes('Text with &lt;b&gt;bold&lt;/b&gt; &amp; special chars'));
            assert.ok(html.includes('data-post-id=""'));
            assert.ok(html.includes('<span class="likes"'));
            assert.ok(html.includes('<span class="dislikes"'));
        });

        it('should return undefined for unknown endpoint.', () => {
            const html = postMethods.formatPostToHtml(mockPosts, 'unknown');
            assert.strictEqual(html, undefined);
        });
    });

});*/