import { sendWebResponse } from '../../methods/responseMethods.js';
import { loadHtml } from '../../methods/utilsMethods.js';
import db from '../../db/connection.js';

/**
 * Handles user page request (GET /user/username).
 *
 * @async
 * @param {import('express').Request} req - Input from browser; ex: url, query.
 * @param {import('express').Response} res - Output from browser; ex: text/html.
 */
export async function handleUserGet(req, res) {
    const { username } = req.params;

    try {
        const user = username;
        // db.query(
        //     'SELECT username, joinDate FROM User WHERE username = ?',
        //     [username],
        //     async (err, result) => {
        //         if (err) {
        //             console.error('User query error:', err);
        //             return sendWebResponse(res);
        //         }

        //         if (result.length === 0) {
        //             return sendWebResponse(res, 404, 'text/plain', '404 User Not Found');
        //         }

        //         user = result[0];
        //     }
        // );
        let template = await loadHtml('user.html');
        template = template.replace('<h1>User</h1>', `User: ${user}`);
        sendWebResponse(res, 200, 'text/html', template);
    } catch (error) {
        console.error('User error:', error);
        sendWebResponse(res);
    }
}