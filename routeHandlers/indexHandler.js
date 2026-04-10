import { sendWebResponse } from '../methods/responseMethods.js';
import { loadHtml } from '../methods/utilsMethods.js';

/**
 * Handles index page request. (GET / || GET /index)
 *
 * @async
 * @param {import('express').Request} req - Input from browser; ex: url, query.
 * @param {import('express').Response} res - Output from browser; ex: text/html.
 */
export async function handleIndexGet(req, res) {
    try {
        const template = await loadHtml('index.html');
        sendWebResponse(res, 200, 'text/html', template);
    } catch (error) {
        console.error('index GET error:', error);
        sendWebResponse(res);
    }
}