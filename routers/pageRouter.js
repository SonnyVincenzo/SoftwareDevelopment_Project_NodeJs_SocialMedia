// Router for "protocol://HERE"

import express from 'express';

import { handleIndexGet } from '../routeHandlers/indexHandler.js';
import { handleAboutGet } from '../routeHandlers/aboutHandler.js';
import { handleHomeGet } from '../routeHandlers/homeHandler.js';
import { handlePostGet, handlePostPost } from '../routeHandlers/postHandler.js';

//Changed pageRouter so that it has access to the MySQL database
export default function pageRouter(db){
    const pageRouter = express.Router();

    // Set endpoints.
    pageRouter.get(['/', '/index'], handleIndexGet);
    pageRouter.get('/about', handleAboutGet);
    pageRouter.get('/home', handleHomeGet);
    pageRouter.get('/post', handlePostGet(db));
    pageRouter.post('/post', handlePostPost(db));

    return pageRouter
}