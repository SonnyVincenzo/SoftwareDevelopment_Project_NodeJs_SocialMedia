import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'fs/promises';

import * as utils from '../private/methods/utilsMethods.js';

describe('Methods Utils: utilsMethod.js:', () => {

    describe('replaceDangerousChars', () => {

        it('should escape HTML special characters correctly.', () => {
            const input = `Astarion & Cazador <script>"test"</script>'`;
            const output = utils.replaceDangerousChars(input);

            assert.strictEqual(output, 'Astarion &amp; Cazador &lt;script&gt;&quot;test&quot;&lt;/script&gt;&#39;');
        });

        it('should handle non-string input by converting to string.', () => {
            const input = 123;
            const output = utils.replaceDangerousChars(input);

            assert.strictEqual(output, '123');
        });
    });

    describe('loadHtml', () => {

        it('should load html file content.', async () => {
            const content = await utils.loadHtml('home.html');

            assert.ok(typeof content === 'string');
            assert.ok(content.length > 0);
        });

        it('should reject if file does not exist.', async () => {
            await assert.rejects(() => utils.loadHtml('does-not-exist.html'), {
                code: 'ENOENT'
            }
            );
        });
    });

    describe('templateLoggedInUser', () => {

        it('should return login button if username is missing.', () => {
            const html = utils.templateLoggedInUser(null);

            assert.ok(html.includes('href="/auth/login"'));
            assert.ok(html.includes('Login'));
        });

        it('should return profile html for logged in user.', () => {
            const html = utils.templateLoggedInUser('john&doe');

            assert.ok(html.includes('/user/john%26doe'));
            assert.ok(html.includes('john&amp;doe'));
            assert.ok(html.includes('class="profile"'));
        });

        it('should encodeURICompontent dangerous username characters.', () => {
            const html = utils.templateLoggedInUser('<script>');

            assert.ok(html.includes('&lt;script&gt;'));
        });

    });

    describe('templateUnloggedUser', () => {

        it('should return login popup html.', () => {
            const html = utils.templateUnloggedUser();

            assert.ok(html.includes('id="login-popup"'));
            assert.ok(html.includes('/auth/login'));
            assert.ok(html.includes('/auth/signup'));
            assert.ok(html.includes('Close'));
        });

    });

});