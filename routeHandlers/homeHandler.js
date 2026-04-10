import { sendWebResponse } from '../methods/responseMethods.js';
import { loadHtml } from '../methods/utilsMethods.js';

/**
 * Handles home page request. (GET /home)
 *
 * @async
 * @param {import('express').Request} req - Input from browser; ex: url, query.
 * @param {import('express').Response} res - Output from browser; ex: text/html.
 */
export async function handleHomeGet(req, res) {
    try {
        const template = await loadHtml('home.html');
        sendWebResponse(res, 200, 'text/html', template);
    } catch (error) {
        console.error('Home GET error:', error);
        sendWebResponse(res);
    }
}