import { describe, it, before } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import bcrypt from 'bcrypt';
import { createTestApp } from './app.test.js';

describe('Signup POST component:', () => {
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

    it('should return 302: username missing.', async () => {
        const res = await request(app)
            .post('/auth/signup')
            .type('form')
            .send({ password: '123' });

        assert.strictEqual(res.statusCode, 302);
        //assert.strictEqual(res.text, '400 Internal Server Error');
    });

    it('should return 400: password missing.', async () => {
        const res = await request(app)
            .post('/auth/signup')
            .type('form')
            .send({ username: '123' });

        assert.strictEqual(res.statusCode, 400);
        //assert.strictEqual(res.text, '400 Internal Server Error');
    });

    it('should return 400: user already exists.', async () => {
        const res = await request(app)
            .post('/auth/signup')
            .type('form')
            .send({ username: '123', password: '123'  });

        assert.strictEqual(res.statusCode, 400);
        //assert.strictEqual(res.text, '500 Internal Server Error');
    });

    it('should redirect to login.', async () => {
        const res = await request(app)
            .post('/auth/login')
            .type('form')
            .send({ username: '123', password: '123' });

        assert.strictEqual(res.statusCode, 302);
        // assert.strictEqual(res.headers.location, '/auth/login'); /user/123
    });
});