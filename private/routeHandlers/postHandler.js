import { sendWebResponse } from "../methods/responseMethods.js";
import { loadHtml } from "../methods/utilsMethods.js";

/**
 * Handles post page request (GET /post).
 *
 * @async
 * @param {import('express').Request} req - Input from browser; ex: url, query.
 * @param {import('express').Response} res - Output from browser; ex: text/html.
 */
export async function handlePostGet(req, res) {
    try {
        const postId = req.query.id; // Query search.

        if (postId) { // Do db logic to fetch post from query id.
            let template = await loadHtml('post-view.html');
            template = template.replace('%%post%%', `postId : ${postId}`);

            sendWebResponse(res, 200, 'text/html', template);
        } else {
            // Show post form.
            const template = await loadHtml('post.html');
            sendWebResponse(res, 200, 'text/html', template);
        }
    } catch (error) {
        console.error('Post GET error:', error);
        sendWebResponse(res);
    }
}

/**
 * Creates Post handler for POST.
 * Wrapper function to enable db content handling.
 * 
 * @param {import('mysql2'.Connection)} db - Database.
 * @returns 
 */
export function createPostPostHandler(db) {

    /**
     * Handles post form into db (POST /post).
     * 
     * @async
     * @param {import('express').Request} req - Input from browser; ex: url, query.
     * @param {import('express').Response} res - Output from browser; ex: text/html.
     */
    return async function handlePostPost(req, res) { // Post-ception.
        try {
            const { postHeader, postText } = req.body; // Form data.
            db.query(
                "INSERT INTO posts (header, content) VALUES (?,?)",
                [postHeader, postText],
                (err, result) => {
                    if (err) {
                        console.error('Post POST error:', err); // Post-ception strikes again.
                        sendWebResponse(res, 500, 'text/plain', '500 Internal Server Error: Database');
                    }
                    let generatedPostId = result.insertId;

                    res.redirect(`/post?id=${generatedPostId}`); // Redirection to newly created post.
                }
            );
        } catch (error) {
            console.error('Post POST error:', error); // Post-ception strikes even more.
            sendWebResponse(res, 500, 'text/plain', '500 Internal Server Error');
        }
    }
}