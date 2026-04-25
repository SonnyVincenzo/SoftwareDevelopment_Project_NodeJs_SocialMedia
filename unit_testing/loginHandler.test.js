import { describe, it, before, after } from 'node:test';
import assert from 'node:assert';
import { createLoginPostHandler } from '../private/routeHandlers/auth/loginHandler.js';
import 'dotenv/config';
import bcrypt from 'bcrypt';

describe('Login POST handler:', () => {
    let mockDb;
    let passHash;
    const saltRounds = parseInt(process.env.SALT_ROUNDS, 10) || 10;

    before(async () => {
        passHash = await bcrypt.hash('123', saltRounds);
        mockDb = {
            end: () => Promise.resolve(),
            execute: (query, params) => {
                if (query === 'SELECT username, password FROM User WHERE username = ?') {
                    if (params[0] === '123') {
                        return Promise.resolve([[{ username: '123', password: passHash }]]);
                    } else if (params[0] === '124') {
                        return Promise.resolve([[]]);
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
        body: { username, password },
        session: {
            regenerate: (cb) => cb(null),
            userId: null
        }
    });
    const createRes = (expectation) => ({
        writeHead: (statusCode, headers) => {
            assert.strictEqual(statusCode, expectation.statusCode);
            assert.deepStrictEqual(headers, { 'Content-Type': expectation.contentType || 'text/plain' });
        },
        write: (message) => {
            assert.strictEqual(message, expectation.message);
        },
        end: () => { }
    });

    it('should return 401: "Invalid username or password".', async () => {
        const req = createReq('124', '123');
        const res = createRes({
            statusCode: 401,
            message: 'Invalid username or password.'
        });

        const handler = createLoginPostHandler(mockDb);
        await handler(req, res);
    });

    it('should return 401: "Invalid username or password".', async () => {
        const req = createReq('123', '124');
        const res = createRes({
            statusCode: 401,
            message: 'Invalid username or password.'
        });

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