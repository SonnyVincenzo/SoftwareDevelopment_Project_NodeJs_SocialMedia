// Router for "protocol://HERE"

import express from 'express';

import { handleIndexGet } from '../routeHandlers/indexHandler.js';
import { handleAboutGet } from '../routeHandlers/aboutHandler.js';
import { handleHomeGet } from '../routeHandlers/homeHandler.js';
import { createCommentPostHandler, createPostGetHandler, createPostPostHandler } from '../routeHandlers/postHandler.js';
import { handlePostFeedGet, createPostFeedSnapshotHandler} from '../routeHandlers/postFeedHandler.js';

export default function createPageRouter(db) {
    const router = express.Router();

    // Set endpoints.
    router.get(['/', '/index'], handleIndexGet);
    router.get('/about', handleAboutGet);
    router.get('/home', handleHomeGet);
    router.get('/post', createPostGetHandler(db));
    router.get('/post-feed', handlePostFeedGet);
    router.get('/post-feed/snapshot', createPostFeedSnapshotHandler(db));

    router.post('/post', createPostPostHandler(db));
    router.post('/comment', createCommentPostHandler(db));

    return router;
}
