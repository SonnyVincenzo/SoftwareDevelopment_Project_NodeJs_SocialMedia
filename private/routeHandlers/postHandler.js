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
            return;
        } 

        // Show post form.
        const template = await loadHtml('post.html');
        sendWebResponse(res, 200, 'text/html', template);
        
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

            if(!postHeader || !postText){
                return sendWebResponse(res,400, "text/plain", "Title and content is required");
            }
            if(postHeader.length > 80){
                return sendWebResponse(res, 400, "text/plain", "Title has to be max 80 characters");
            }
            if(postText.length > 500){
                return sendWebResponse(res, 400, "text/plain", "Post has to be max 500 characters");
            }

            //temp fallback until login is handled right
            const username = "blob";

            db.query(
                `INSERT INTO Posts (username, postHeader, postText, postDate) VALUES (?,?,?,NOW())`,
                [username, postHeader, postText],
                (err, result) => {
                    if (err) {
                        console.error('Post POST error:', err); // Post-ception strikes again.
                        sendWebResponse(res, 500, 'text/plain', '500 Internal Server Error: Database');
                        return;
                    }

                    res.redirect(`/post?id=${result.insertId}`); // Redirection to newly created post.
                }
            );
        } catch (error) {
            console.error('Post POST error:', error); // Post-ception strikes even more.
            sendWebResponse(res, 500, 'text/plain', '500 Internal Server Error');
        }
    }
}