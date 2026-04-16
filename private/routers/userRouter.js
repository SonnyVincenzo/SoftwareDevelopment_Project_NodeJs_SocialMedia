// Router for "protocol://user/HERE"

import express from 'express';

import { createUserGetHandler } from '../routeHandlers/user/userHandler.js';

export default function createUserRouter(db) {
    const router = express.Router();

    // Set endpoints. ("/:username": allowing "user/someonesUsername")
    router.get('/:username', createUserGetHandler(db));
    return router;
}