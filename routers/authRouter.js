// Router for "protocol://auth/HERE""

import express from 'express';

import { handleLogin, handleLoginPost } from '../routeHandlers/auth/loginHandler.js';
import { handleSignup, handleSignupPost } from '../routeHandlers/auth/signupHandler.js';

const authRouter = express.Router();

// Set endpoints.
authRouter.get('/login', handleLogin);
authRouter.get('/signup', handleSignup);

// For form and db:
authRouter.post('/login', handleLoginPost);
authRouter.post('/signup', handleSignupPost);

export default authRouter;