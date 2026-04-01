import { sendWebResponse } from '../../methods/responseMethods.js';
import { loadHtml } from '../../methods/utilsMethods.js';

/**
 * Handles user page request (GET /user/username).
 *
 * @async
 * @param {import('express').Request} req - Input from browser; ex: url, query.
 * @param {import('express').Response} res - Output from browser; ex: text/html.
 */
export async function handleUser(req, res) {
    const { username } = req.params;

    try {
        let template = await loadHtml('user.html');

        /* To do here:
        - Add db fetch for username.
        - Update user.html content appropiately and insert it here.
        */
        template = template.replace('<h1>User</h1>', `User: ${username}`);
        sendWebResponse(res, 200, 'text/html', template);
    } catch (error) {
        console.error('User error:', error);
        sendWebResponse(res);
    }
}