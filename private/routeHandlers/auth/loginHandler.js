import { sendWebResponse } from '../../methods/responseMethods.js';
import { loadHtml } from '../../methods/utilsMethods.js';
import bcrypt from 'bcrypt';

/**
 * Handles login page request (GET /auth/login).
 *
 * @async
 * @param {import('express').Request} req - Input from browser; ex: url, query.
 * @param {import('express').Response} res - Output from browser; ex: text/html.
 */
export async function handleLoginGet(req, res) {
    try {
        const template = await loadHtml('login.html');
        sendWebResponse(res, 200, 'text/html', template);
    } catch (error) {
        console.error('Login GET error:', error);
        sendWebResponse(res);
    }
}

/**
 * Creates User handler for GET.
 * Wrapper function to enable db content handling. 
 * 
 * @param {import('mysql2'.Connection)} db - Database.
 * @returns 
 */
export function createLoginPostHandler(db) {

    /**
     * Handles login form fetching data from db (POST /auth/login).
     *
     * @async
     * @param {import('express').Request} req - Input from browser; ex: url, query.
     * @param {import('express').Response} res - Output from browser; ex: text/html.
     */
    return async function handleLoginPost(req, res) {
        const { username, password } = req.body; // Form data.

        if (!username || !password) {
            let message = !username ? 'Username required!' : 'Password required!';
            return sendWebResponse(res, 400, 'text/plain', message);
        }

        try {
            const [rows] = await db.execute(
                'SELECT username, password FROM User WHERE username = ?',
                [username]
            );

            const user = rows[0];
            const userPassword = user ? user.password : '$2b$10$CwTycUXWue0Thq9StjUM0uJ8zFZp6V9v3gS5h9u1yF6Qe6u6Y9G6K';
            const passMatch = await bcrypt.compare(password, userPassword);

            if (!user || !passMatch) {
                return sendWebResponse(res, 401, 'text/plain', 'Invalid username or password.');
            }

            req.session.regenerate(err => {
                if (err) {
                    return sendWebResponse(res, 500, 'text/plain', 'Session error');
                }

                req.session.userId = user.username;
                res.redirect(`/user/${user.username}`); // Should it be username or uuid?
            });
        } catch (error) {
            console.error('Login POST error:', error); // Log error for debugging
            sendWebResponse(res, 500, 'text/plain', '500 Internal Server Error');
        }
    }
}