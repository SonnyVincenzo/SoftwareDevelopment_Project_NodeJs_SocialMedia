import express from 'express';
import session from 'express-session';
import { createLoginPostHandler } from '../private/routeHandlers/auth/loginHandler.js';
import { createSignupPostHandler } from '../private/routeHandlers/auth/signupHandler.js';

import createUserRouter from '../private/routers/userRouter.js';

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

    app.use('/user', createUserRouter(mockDb));

    app.post('/auth/login', createLoginPostHandler(mockDb)); // Login component test.
    app.post('/auth/signup', createSignupPostHandler(mockDb)); // Signup component test.

    return app;
}