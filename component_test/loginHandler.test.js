import { describe, it, before, after } from 'node:test';
import assert from 'node:assert';
import 'dotenv/config';
import bcrypt from 'bcrypt';
import fs from 'fs/promises';
import * as utils from '../private/methods/utilsMethods.js'
import { createLoginGetHandler, createLoginPostHandler } from '../private/routeHandlers/auth/loginHandler.js';

describe('routeHandler: loginHandler.js:', () => {
    let mockDb;
    let passHash;
    const saltRounds = parseInt(process.env.SALT_ROUNDS, 10) || 10;
    let orgConsoleErr;

    before(async () => {
        orgConsoleErr = console.error;
        console.error = () => { };
        passHash = await bcrypt.hash('123', saltRounds);
        mockDb = {
            end: () => Promise.resolve(),
            execute: (query, params) => {
                if (query === 'SELECT username, password FROM User WHERE username = ?') {
                    if (params[0] === '123') {
                        return Promise.resolve([[{ username: '123', password: passHash }]]);
                    }
                    return Promise.resolve([[]]);
                }
                return Promise.reject(new Error('Unknown query'));
            }
        };
    });

    after(async () => {
        console.error = orgConsoleErr;
        await mockDb.end();
    });

    const createReq = (username, password) => ({
        body: { username, password },
        session: {
            regenerate: (cb) => cb(null),
            userId: null
        }
    });
    const createRes = () => ({
        statusCode: null,
        headers: null,
        body: '',
        redirectedTo: null,

        writeHead(code, headers) {
            this.statusCode = code;
            this.headers = headers;
        },
        write(data) {
            this.body += data;
        },
        redirect(url) {
            this.redirectedTo = url;
        },
        end() { }
    });

    describe('Login GET handler:', () => {

        it('should handle error.', async () => {
            const req = createReq();
            const res = createRes();

            const handler = createLoginGetHandler('nonexistent.html');
            await handler(req, res);
            assert.strictEqual(res.statusCode, 500);
        });

        it('should return login page.', async () => {
            const req = createReq();
            const res = createRes();

            const handler = createLoginGetHandler();
            await handler(req, res);

            assert.strictEqual(res.statusCode, 200);
            assert.strictEqual(res.headers['Content-Type'], 'text/html');
            assert.ok(res.body.length > 0);
        });

    });

    describe('Login POST handler:', () => {

        it('should return 400: username missing.', async () => {
            const req = createReq(undefined, '123');
            const res = createRes();

            const handler = createLoginPostHandler(mockDb);
            await handler(req, res);

            assert.strictEqual(res.statusCode, 400);
            assert.strictEqual(res.body, 'Username required!');
        });

        it('should return 400: password missing.', async () => {
            const req = createReq('123', undefined);
            const res = createRes();

            const handler = createLoginPostHandler(mockDb);
            await handler(req, res);

            assert.strictEqual(res.statusCode, 400);
            assert.strictEqual(res.body, 'Password required!');
        });

        it('should return 401: Invalid username.', async () => {
            const req = createReq('wrong', '123');
            const res = createRes();

            const handler = createLoginPostHandler(mockDb);
            await handler(req, res);

            assert.strictEqual(res.statusCode, 401);
            assert.strictEqual(res.body, 'Invalid username or password.');
        });

        it('should return 401: Invalid password.', async () => {
            const req = createReq('123', 'wrong');
            const res = createRes();

            const handler = createLoginPostHandler(mockDb);
            await handler(req, res);

            assert.strictEqual(res.statusCode, 401);
            assert.strictEqual(res.body, 'Invalid username or password.');
        });

        it('should return 500: database error.', async () => {
            const failingDb = {
                execute: () => Promise.reject(new Error('DB failure.'))
            };

            const req = createReq('123', '123');
            const res = createRes();

            const handler = createLoginPostHandler(failingDb);
            await handler(req, res);

            assert.strictEqual(res.statusCode, 500);
            assert.strictEqual(res.body, '500 Internal Server Error');
        });

        it('should return 500: session regeneration fail.', async () => {
            const req = createReq('123', '123');
            req.session.regenerate = (cb) => cb(new Error('fail'));
            const res = createRes();

            const handler = createLoginPostHandler(mockDb);
            await handler(req, res);

            assert.strictEqual(res.statusCode, 500);
            assert.strictEqual(res.body, 'Session error');
        });

        it('should error log on DB failure.', async () => {
            let loggedMessage = '';
            const originalError = console.error;

            console.error = (...args) => {
                loggedMessage += args.join(' ');
            };
            const dbFailure = {execute: () => Promise.reject(new Error('DB failure.'))};

            const req = createReq('123', '123');
            const res = createRes();

            const handler = createLoginPostHandler(dbFailure);
            await handler(req, res);

            assert.match(loggedMessage, /Login POST error/i);
            console.error = originalError;
        });

        it('should throw error when file cannot be read.', async () => {
            const original = fs.readFile;

            fs.readFile = async () => {
                throw new Error('File not found');
            };

            await assert.rejects(() => utils.loadHtml('login.html'));

            fs.readFile = original;
        });

        it('should redirect on successful login.', async () => {
            const req = createReq('123', '123');
            const res = createRes();

            const handler = createLoginPostHandler(mockDb);
            await handler(req, res);

            assert.strictEqual(res.redirectedTo, '/user/123');
        });

    });
});