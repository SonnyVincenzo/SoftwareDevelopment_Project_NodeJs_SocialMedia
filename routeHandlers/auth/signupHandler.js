import { sendWebResponse } from '../../methods/responseMethods.js';
import { loadHtml } from '../../methods/utilsMethods.js';

/**
 * Handles signup page request (GET /auth/signup).
 *
 * @async
 * @param {import('express').Request} req - Input from browser; ex: url, query.
 * @param {import('express').Response} res - Output from browser; ex: text/html.
 */
export async function handleSignup(req, res) {
    try {
        const template = await loadHtml('signup.html');
        sendWebResponse(res, 200, 'text/html', template);
    } catch (error) {
        console.error('Signup error:', error);
        sendWebResponse(res);
    }
}

/**
 * Handles signup form into db (POST /auth/signup).
 *
 * @async
 * @param {import('express').Request} req - Input from browser; ex: url, query.
 * @param {import('express').Response} res - Output from browser; ex: text/html.
 */
export async function handleSignupPost(req, res) {
    try {
        const { username, password } = req.body; // form data

        // Insert data into db.
        // Remember to NOT store plaintext passwords.

        sendWebResponse(res, 201, 'text/plain', `User ${username} created successfully!`);
    } catch (error) {
        console.error('Signup POST error:', error);
        sendWebResponse(res, 500, 'text/plain', '500 Internal Server Error');
    }
}