// Router for "protocol://HERE"

import express from 'express';

import { handleIndexGet } from '../routeHandlers/indexHandler.js';
import { handleAboutGet } from '../routeHandlers/aboutHandler.js';
import { handleHomeGet } from '../routeHandlers/homeHandler.js';
import { handlePostGet, createPostPostHandler } from '../routeHandlers/postHandler.js';
import { handlePostFeedGet, createPostFeedHandler } from '../routeHandlers/postFeedHandler.js';

export default function createPageRouter(db) {
    const router = express.Router();

    // Set endpoints.
    router.get(['/', '/index'], handleIndexGet);
    router.get('/about', handleAboutGet);
    router.get('/home', handleHomeGet);
    router.get('/post', handlePostGet);
    router.get('/postFeed', createPostFeedHandler(db))

    router.post('/post', createPostPostHandler(db));

    return router;
}