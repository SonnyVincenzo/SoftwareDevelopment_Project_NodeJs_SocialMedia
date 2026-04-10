// Router for "protocol://auth/HERE""

import express from 'express';

import { handleLoginGet, handleLoginPost } from '../routeHandlers/auth/loginHandler.js';
import { handleSignupGet, handleSignupPost } from '../routeHandlers/auth/signupHandler.js';

const authRouter = express.Router();

// Set endpoints.
authRouter.get('/login', handleLoginGet);
authRouter.get('/signup', handleSignupGet);

// For form and db:
authRouter.post('/login', handleLoginPost);
authRouter.post('/signup', handleSignupPost);

export default authRouter;