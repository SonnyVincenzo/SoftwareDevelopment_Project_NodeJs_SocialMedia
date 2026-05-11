import { sendWebResponse } from '../methods/responseMethods.js';
import { loadHtml, templateLoggedInUser, templateUnloggedUser } from '../methods/utilsMethods.js';
import { formatPostToHtml } from '../methods/post/postMethods.js';

/**
 * Creates Home handler for GET.
 * Wrapper function to enable db content handling.
 * 
 * @param {import('mysql2'.Connection)} db - Database.
 * @returns 
 */
export function createHomeGetHandler(db) {

    /**
     * Handles home page request. (GET /home)
     *
     * @async
     * @param {import('express').Request} req - Input from browser; ex: url, query.
     * @param {import('express').Response} res - Output from browser; ex: text/html.
     */
    return async function handleHomeGet(req, res) {
        try {

            let template = await loadHtml('home.html');
            let posts = await db.execute(
                `SELECT * FROM posts ORDER BY postDate DESC`
            );
            let postHtml = await formatPostToHtml(db, posts[0], 'home'); // 'home' is a workaround until unified frontend.

            let isLoggedIn = req.session.userId;
            if (!isLoggedIn) {
                template = template.replace('%%loginPopup%%', templateUnloggedUser());
            }

            template = template
                .replace("%%posts%%", postHtml)
                .replace('%%usernameButton%%', templateLoggedInUser(req.session.userId));
            sendWebResponse(res, 200, 'text/html', template);
        } catch (error) {
            console.error('Home GET error:', error);
            sendWebResponse(res);
        }
    }


}