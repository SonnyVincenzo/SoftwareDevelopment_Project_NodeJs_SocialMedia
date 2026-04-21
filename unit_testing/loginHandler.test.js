import { describe, it, before, after } from 'node:test';
import assert from 'node:assert';
import { createLoginPostHandler } from '../private/routeHandlers/auth/loginHandler.js';

describe('Login POST handler:', () => {
    let mockDb;

    before(() => {
        mockDb = {
            end: () => Promise.resolve(),
            execute: (query, params) => {
                if (query === 'SELECT username, password FROM User WHERE username = ?') {
                    if (params[0] === '123') {
                        return Promise.resolve([[{ username: '123', password: '123' }]]);
                    } else if (params[0] === '124') {
                        return Promise.resolve([]);
                    }
                }
                return Promise.reject(new Error('Unknown query'));
            }
        };
    });

    after(async () => {
        await mockDb.end();
    });

    const createReq = (username, password) => ({
        body: { username, password }
    });
    const createRes = (expectation) => ({
        writeHead: (statusCode, headers) => {
            assert.strictEqual(statusCode, expectation.statusCode);
            assert.deepStrictEqual(headers, { 'Content-Type': expectation.contentType || 'text/plain' });
        },
        write: (message) => {
            assert.strictEqual(message, expectation.message);
        },
        end: () => {}
    });

    it('should return 401: "Invalid username".', async () => {
        const req = createReq('124', '123');
        const res = createRes({ statusCode: 401, message: 'Invalid username.' });

        const handler = createLoginPostHandler(mockDb);
        await handler(req, res);
    });

    it('should return 401: "Incorrect password".', async () => {
        const req = createReq('123', '124');
        const res = createRes({ statusCode: 401, message: 'Incorrect password.' });

        const handler = createLoginPostHandler(mockDb);
        await handler(req, res);
    });

    it('should redirect on successful login.', async () => {
        const req = createReq('123', '123');
        let redirectedTo = null;
        const res = {
            redirect: (url) => {
                redirectedTo = url;
            }
        };

        const handler = createLoginPostHandler(mockDb);
        await handler(req, res);

        assert.strictEqual(redirectedTo, '/user/123');
    });
});