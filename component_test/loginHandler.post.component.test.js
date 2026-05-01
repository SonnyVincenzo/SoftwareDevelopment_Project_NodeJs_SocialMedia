import { describe, it, before } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import bcrypt from 'bcrypt';
import { createTestApp } from './app.test.js';

describe('Login POST component:', () => {
    let app;
    let passHash;

    before(async () => {
        passHash = await bcrypt.hash('123', 10);

        const mockDb = {
            execute: (query, params) => {
                if (params[0] === '123') {
                    return Promise.resolve([[{
                        username: '123',
                        password: passHash
                    }]]);
                }
                return Promise.resolve([[]]);
            }
        };

        app = createTestApp(mockDb);
    });

    it('should return 400: username missing.', async () => {
        const res = await request(app)
            .post('/auth/login')
            .type('form')
            .send({ password: '123' });

        assert.strictEqual(res.statusCode, 400);
        assert.strictEqual(res.text, 'Username required!');
    });

    it('should return 400: password missing.', async () => {
        const res = await request(app)
            .post('/auth/login')
            .type('form')
            .send({ username: '123' });

        assert.strictEqual(res.statusCode, 400);
        assert.strictEqual(res.text, 'Password required!');
    });
    
    it('should return 401: wrong username.', async () => {
        const res = await request(app)
            .post('/auth/login')
            .type('form')
            .send({ username: '999', password: '123' });

        assert.strictEqual(res.statusCode, 401);
        assert.strictEqual(res.text, 'Invalid username or password.');
    });

    it('should return 401: wrong password.', async () => {
        const res = await request(app)
            .post('/auth/login')
            .type('form')
            .send({ username: '123', password: 'wrong' });

        assert.strictEqual(res.statusCode, 401);
        assert.strictEqual(res.text, 'Invalid username or password.');
    });

    it('should return 500: database fail.', async () => {
        const originalError = console.error;
        console.error = () => { };

        const dbFailure = {
            execute: () => Promise.reject(new Error('DB failure'))
        };

        const appFailure = createTestApp(dbFailure);
        const res = await request(appFailure)
            .post('/auth/login')
            .type('form')
            .send({ username: '123', password: '123' });

        assert.strictEqual(res.statusCode, 500);
        assert.strictEqual(res.text, '500 Internal Server Error');
        console.error = originalError;
    });

    it('should handle malformed request.', async () => {
        const res = await request(app)
            .post('/auth/login')
            .set('Content-Type', 'application/json')
            .send('invalid_payload');

        assert.ok([400, 500].includes(res.statusCode));
    });

    it('should redirect and set session on success.', async () => {
        const res = await request(app)
            .post('/auth/login')
            .type('form')
            .send({ username: '123', password: '123' });

        assert.strictEqual(res.statusCode, 302);
        assert.strictEqual(res.headers.location, '/user/123');
        assert.ok(res.headers['set-cookie'], 'Session cookie should be set');
    });
});