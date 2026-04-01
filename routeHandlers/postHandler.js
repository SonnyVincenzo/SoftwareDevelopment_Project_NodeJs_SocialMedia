import { sendWebResponse } from "../methods/responseMethods.js";
import { loadHtml } from "../methods/utilsMethods.js";

/**
 * Handles post page request (GET /post).
 *
 * @async
 * @param {import('express').Request} req - Input from browser; ex: url, query.
 * @param {import('express').Response} res - Output from browser; ex: text/html.
 */
export async function handlePost(req, res) {
    try {
        const postId = req.query.id; // Query search.

        if (postId) { // Do db logic to fetch post from query id.
            let template = await loadHtml('post.html');
            template = template.replaceAll('post', `postId : ${postId}`);


            sendWebResponse(res, 200, 'text/html', template);
        } else {
            // Show post form.
            const template = await loadHtml('post.html');
            sendWebResponse(res, 200, 'text/html', template);
        }
    } catch (error) {
        console.error('Post error:', error);
        sendWebResponse(res);
    }
}

/**
 * Handles post form into db (POST /post).
 * 
 * @async
 * @param {import('express').Request} req - Input from browser; ex: url, query.
 * @param {import('express').Response} res - Output from browser; ex: text/html.
 */
export async function handlePostPost(req, res) { // Post-ception.
    try {
        const { postHeader, postText } = req.body; // form data

        // Insert data into db for posts.

        sendWebResponse(res, 201, 'text/plain', 'Post successful!');
    } catch (error) {
        console.error('Post POST error:', error); // Post-ception strikes again.
        sendWebResponse(res, 500, 'text/plain', '500 Internal Server Error');
    }
}