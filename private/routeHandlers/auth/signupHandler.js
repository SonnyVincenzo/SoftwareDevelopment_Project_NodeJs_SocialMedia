import { sendWebResponse } from '../../methods/responseMethods.js';
import { loadHtml } from '../../methods/utilsMethods.js';
import bcrypt from 'bcrypt';

const saltRounds = 10;

/**
 * Handles signup page request (GET /auth/signup).
 *
 * @async
 * @param {import('express').Request} req - Input from browser; ex: url, query.
 * @param {import('express').Response} res - Output from browser; ex: text/html.
 */
export async function handleSignupGet(req, res) {
    try {
        const template = await loadHtml('signup.html');
        sendWebResponse(res, 200, 'text/html', template);
    } catch (error) {
        console.error('Signup GET error:', error);
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
export function createSignupPostHandler(db) {

    /**
     * Handles signup form into db (POST /auth/signup).
     *
     * @async
     * @param {import('express').Request} req - Input from browser; ex: url, query.
     * @param {import('express').Response} res - Output from browser; ex: text/html.
     */
    return async function handleSignupPost(req, res) {
        try {
            const { username, password, dob } = req.body; // form data
            console.log(username, password, dob);

            // check if user already exists
            let result = await db.query(
                'SELECT username FROM `User` WHERE username = ?',
                [username]
            );
            if (result[0].length >= 1) {
                return sendWebResponse(res, 400, 'text/plain', 'Username already taken');
            }

            // hash before storing
            const hash = await bcrypt.hash(password, saltRounds);
            let insertRes = await db.query(
                'INSERT INTO User (username, password, joinDate) VALUES (?, ?, NOW())',
                [username, hash]
            );

            res.redirect(`/user/${username}`);
        } catch (error) {
            console.error('Signup POST error:', error);
            sendWebResponse(res, 500, 'text/plain', '500 Internal Server Error');
        }
    }
}
