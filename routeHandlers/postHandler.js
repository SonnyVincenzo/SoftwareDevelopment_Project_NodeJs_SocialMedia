import { sendWebResponse } from "../methods/responseMethods.js";
import { loadHtml } from "../methods/utilsMethods.js";

/**
 * Handles post page request (GET /post).
 * 
 * //Added parameter for importing MySQL database
 * @param {import('mysql2').Connection} db
 */

//Commented out these parameters but didn't remove them in case they are needed later
//@async
//@param {import('express').Request} req - Input from browser; ex: url, query.
//@param {import('express').Response} res - Output from browser; ex: text/html.

/** 
 * Changes by SonnyVincenzo (Josef)
 * Changed HandlePost functions to use a shared MySQL connection from index.js through pageRouter.js
 * Replaced placeholder post creation with SQL INSERT queries
 * changed GET so it actually gets the good stuff from the SQL database
 * 
*/

export function handlePostGet(db) {
    return async function (req, res){
        try {
            const postId = req.query.id; // Query search.

            if (postId) { 
                db.query(
                    "SELECT * FROM posts WHERE id = ?",
                    [postId],
                    async (err, results) => {
                        if(err){
                            console.error("Post GET query error:", err);
                            return sendWebResponse(res, 500, "text/plain","database error");
                        }

                        if(results.length === 0){
                            return sendWebResponse(res, 404, "text/plain", "404 Post not found");
                        }

                        let template = await loadHtml("post-view.html");
                        template = template.replace("%%post%%", results[0].content);

                        sendWebResponse(res, 200, "text/html", template);
                    }
                )
            } else {
                const template = await loadHtml("post.html");
                sendWebResponse(res, 200, "text/html", template);

            }
        } catch (error) {
            console.error('Post GET error:', error);
            sendWebResponse(res, 500, "text/plain", "500 internal server error");
        }
    }
}

/**
 * Handles post form into db (POST /post).
 * 
 * @param {import('mysql2').Connection} db
 */
// @async
// @param {import('express').Request} req - Input from browser; ex: url, query.
// @param {import('express').Response} res - Output from browser; ex: text/html.

export function handlePostPost(db) { // Post-ception.
    return async function (req, res){
        try {
            const { postHeader, postText } = req.body; // Form data.
            
            const content = [postHeader, postText]
                .filter(Boolean)
                .join("\n")
                .trim();

            if (!content){
                return sendWebResponse(res, 400, "text/plain", "post content is required");
            }

            db.query(
                "INSERT INTO posts (content) VALUES (?)",
                [content],
                (err, result) => {
                    if (err){
                        console.error("Post POST query error:", err);
                        return sendWebResponse(res, 500, "text/plain", "database error");
                    }

                    res.redirect(`/post?id=${result.insertId}`); // Redirection to newly created post.
                }
            );
        
        } catch (error) {
            console.error('Post POST error:', error); // Post-ception strikes again.
            sendWebResponse(res, 500, 'text/plain', '500 Internal Server Error');
        }
    }
}