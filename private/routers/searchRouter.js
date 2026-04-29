import express from 'express';
import createSearchHandler from '../routeHandlers/searchHandler.js';

export default function createSearchRouter(db)
{
    const router = express.Router();
    const handler = createSearchHandler(db);

    router.get('/', handler.search);

    return router;
}