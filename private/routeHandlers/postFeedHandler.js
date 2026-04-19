import { sendWebResponse } from '../methods/responseMethods.js';
import { loadHtml } from '../methods/utilsMethods.js';


/**
 * Creates Post handler for POST.
 * Wrapper function to enable db content handling.
 * 
 * @param {import('mysql2'.Connection)} db - Database.
 * @returns 
 */
export function createPostFeedHandler(db) {
    return async (req, res) => {
        const [rows] = await db.query('SELECT postTitle FROM Post LIMIT 20');
        res.json(rows);
    };
}


/**
 * Handles postFeed page request. (GET / || GET /postFeed)
 *
 * @async
 * @param {import('express').Request} req - Input from browser; ex: url, query.
 * @param {import('express').Response} res - Output from browser; ex: text/html.
 */
export async function handlePostFeedGet(req, res) {
    try {
        const template = await loadHtml('postFeed.html');
        sendWebResponse(res, 200, 'text/html', template);
    } catch (error) {
        console.error('postFeed GET error:', error);
        sendWebResponse(res);
    }
}