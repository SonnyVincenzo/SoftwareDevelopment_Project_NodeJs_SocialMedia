// Router for "protocol://user/HERE"

import express from 'express';

import { handleUser } from '../routeHandlers/user/userHandler.js';

const userRouter = express.Router();

// Set endpoints. ("/:username": allowing "user/someonesUsername")
userRouter.get('/:username', handleUser);

export default userRouter;