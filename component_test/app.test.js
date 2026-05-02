import express from 'express';
import session from 'express-session';
import { createLoginPostHandler } from '../private/routeHandlers/auth/loginHandler.js';

/** Creates test app for component testing.
 * 
 * @param {*} mockDb 
 * @returns 
 */
export function createTestApp(mockDb) {
    const app = express();

    app.use(express.urlencoded({ extended: false }));

    app.use(session({
        secret: 'test-secret',
        resave: false,
        saveUninitialized: false
    }));

    app.post('/auth/login', createLoginPostHandler(mockDb)); // Login component test.

    return app;
}