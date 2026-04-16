// Router for "protocol://auth/HERE""

import express from 'express';

import { handleLoginGet, createLoginPostHandler } from '../routeHandlers/auth/loginHandler.js';
import { handleSignupGet, createSignupPostHandler } from '../routeHandlers/auth/signupHandler.js';

export default function createAuthRouter(db) {
    const router = express.Router();
    
    // Set endpoints.
    router.get('/login', handleLoginGet);
    router.get('/signup', handleSignupGet);

    // For form and db:
    router.post('/login', createLoginPostHandler(db));
    router.post('/signup', createSignupPostHandler(db));

    return router;
}