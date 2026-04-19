import { sendWebResponse } from '../../methods/responseMethods.js';
import { loadHtml } from '../../methods/utilsMethods.js';

/**
 * Creates User handler for GET.
 * Wrapper function to enable db content handling. 
 * 
 * @param {import('mysql2'.Connection)} db - Database.
 * @returns 
 */
export function createUserGetHandler(db) {
    
    /**
     * Handles user page request (GET /user/username).
     *
     * @async
     * @param {import('express').Request} req - Input from browser; ex: url, query.
     * @param {import('express').Response} res - Output from browser; ex: text/html.
     */
    return async function handleUserGet(req, res) {
        const { username } = req.params;

        try {
            db.query(
            'SELECT username, joinDate FROM User WHERE username = ?',
            [username],
            async (err, result) => {
                if (err) {
                    console.error('User query error:', err);
                    return sendWebResponse(res);
                }   

                if (result.length === 0) {
                    return sendWebResponse(res, 404, 'text/plain', '404 User Not Found');
                }

                db.query(
                    `SELECT id, postHeader, postText, postDate FROM Posts WHERE username = ? ORDER BY postDate DESC`,
                    [username],
                    async(err, postResult) => {
                        if(err){
                            console.error("post query error: ", err);
                            return sendWebResponse(res);
                        }

                        let template = await loadHtml("user.html");

                        template = template.replace("<h1>Full Name</h1>", `<h1>${username}</h1>`);
                        template = template.replace("<h5>@Username</h5>", `<h5>$@{username}</h5>`);

                        const postHtml = postResult.length === 0 ? "<p>No posts yet. </p>" : postResult
                            .map(
                                (post) =>
                                    `<article class = "post">
                                        <h3>${post.postHeader}</h3>
                                        <p>${post.postText}</p>
                                        <small>${post.postDate}</small>
                                    </article>`
                            ).join("");

                        template = template.replace(
                            `<div class = "posts">
                                    <p>post 1</p>
                                    <p>post 2</p>
                                </div>`,
                            `<div class ="posts">${postHtml}</div>`
                        );
                        sendWebResponse(res,200, "text/html", template);
                    }
                );
            }
            );
        } catch (error) {
            console.error('User error:', error);
            sendWebResponse(res);
        }
    };
}