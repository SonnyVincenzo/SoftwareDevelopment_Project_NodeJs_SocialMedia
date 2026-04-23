import { sendWebResponse } from '../methods/responseMethods.js';
import { loadHtml } from '../methods/utilsMethods.js';

/**
 * Creates Post-Feed Snapshot handler for JSON GET.
 * Wrapper function to enable db content handling.
 * 
 * @param {import('mysql2'.Connection)} db - Database.
 * @returns 
 */
export function createPostFeedSnapshotHandler(db) {
    return async (req, res) => {
        try {
            const table = process.env.DB_TABLE_POSTS;
            const element1 = process.env.DB_ELEMENT_POST_HEADER;
            const element2 = process.env.DB_ELEMENT_USERNAME;
            const [rows] = await db.query(
                `SELECT ?? as title, ?? as name FROM ?? LIMIT 20;`,
                [element1, element2, table]
            );
            res.json(rows);
        }
        catch (error) {
            console.error('Failed to recieve data from the mysql server:', error);
            sendWebResponse(res);
        }

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
        const template = await loadHtml('post-feed.html');
        sendWebResponse(res, 200, 'text/html', template);
    } catch (error) {
        console.error('postFeed GET error:', error);
        sendWebResponse(res);
    }
}