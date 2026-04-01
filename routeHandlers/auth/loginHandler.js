import { sendWebResponse } from '../../methods/responseMethods.js';
import { loadHtml } from '../../methods/utilsMethods.js';

/**
 * Handles login page request (GET /auth/login).
 *
 * @async
 * @param {import('express').Request} req - Input from browser; ex: url, query.
 * @param {import('express').Response} res - Output from browser; ex: text/html.
 */
export async function handleLogin(req, res) {
    try {
        const template = await loadHtml('login.html');
        sendWebResponse(res, 200, 'text/html', template);
    } catch (error) {
        console.error('Login error:', error);
        sendWebResponse(res);
    }
}

/**
 * Handles login form fetching data from db (POST /auth/login).
 *
 * @async
 * @param {import('express').Request} req - Input from browser; ex: url, query.
 * @param {import('express').Response} res - Output from browser; ex: text/html.
 */
export async function handleLoginPost(req, res) {
    try {
        const { username, password } = req.body; // form data.

        // sendWebResponse(res, 200, 'text/plain', `Welcome, ${username}!`);
        // sendWebResponse(res, 401, 'text/plain', 'Invalid username or password');
    } catch (error) {
        console.error('Login POST error:', error);
        sendWebResponse(res, 500, 'text/plain', '500 Internal Server Error');
    }
}