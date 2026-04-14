// Router for "protocol://user/HERE"

import express from 'express';

import { handleUserGet } from '../routeHandlers/user/userHandler.js';

const userRouter = express.Router();

// Set endpoints. ("/:username": allowing "user/someonesUsername")
userRouter.get('/:username', handleUserGet);

export default userRouter;