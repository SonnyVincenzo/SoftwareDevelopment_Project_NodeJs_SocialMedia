import { sendWebResponse } from "../methods/responseMethods.js";
import { loadHtml } from "../methods/utilsMethods.js";

//function to make mysql queries compatible 
//with the rest of the repository, this function is important for my sanity

//function to make mysql queries compatible 
//with the rest of the repository, this function is important for my sanity
function mysqlQueryFix(db, sql, params = []) {
    //if the db has .execute, do mysql2/promise
    if (typeof db.execute === "function") {
        return db.execute(sql, params).then(([rows]) => rows);
    }
    //otherwise do db.query
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}

/**
 * Checks if provided commentText contains any letters.
 * 
 * @param {string} commentText - Content to check if it contains text or not.
 * @returns True or false, if it's a valid comment or not.
 */
export function isValidComment(commentText) {
    if (!commentText) return false;
    if (commentText.trim() === "") return false;
    return true;
}

/**
 * Creates Post handler for GET.
 * Wrapper function to enable db content handling.
 * 
 * @param {import('mysql2'.Connection)} db - Database.
 * @returns 
 */
export function createPostGetHandler(db) {

    /**
     * Handles post page request (GET /post).
     *
     * @async
     * @param {import('express').Request} req - Input from browser; ex: url, query.
     * @param {import('express').Response} res - Output from browser; ex: text/html.
     */
    return async function handlePostGet(req, res) {
        try {
            const postId = req.query.id;

            if (postId) {
                const [rows] = await db.query(
                    "SELECT * FROM posts WHERE id = ?",
                    [postId]
                );

                if (rows.length === 0) {
                    return sendWebResponse(res, 404, 'text/plain', 'Post not found');
                }

                const post = rows[0];
                let template = await loadHtml('post-view.html');
                template = template
                    .replace('%%username%%', post.username)
                    .replace('%%postHeader%%', post.postHeader)
                    .replace('%%postText%%', post.postText)
                    .replace('%%postDate%%', post.postDate);
                template = template.replace('%%post%%', 'I found'); // Temp indication of finding.
                return sendWebResponse(res, 200, 'text/html', template);
            }

            const template = await loadHtml('post.html');
            return sendWebResponse(res, 200, 'text/html', template);
        } catch (error) {
            console.error('Post GET error:', error);
            return sendWebResponse(res, 500, 'text/plain', 'Internal server error: Unable to fetch queried id.');
        }
    };
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
            if (!req.session || !req.session.userId) {
                return sendWebResponse(res, 401, "text/plain", "You must be logged in to post");
            }
            const username = req.session.userId;

            //Trim post header and post text 
            const plainHeader = req.body.postHeader;
            const plainText = req.body.postText;

            let postHeader = "";
            if (typeof plainHeader === "string") {
                postHeader = plainHeader.trim();
            }

            let postText = "";
            if (typeof plainText === "string") {
                postText = plainText.trim();
            }

            //character restrictions for posts
            if (!postHeader || !postText) {
                return sendWebResponse(res, 400, "text/plain", "Title and content is required");
            }
            if (postHeader.length > 80) {
                return sendWebResponse(res, 400, "text/plain", "Title has to be max 80 characters");
            }
            if (postText.length > 500) {
                return sendWebResponse(res, 400, "text/plain", "Post has to be max 500 characters");
            }

            const result = await mysqlQueryFix(db,
                `INSERT INTO Posts (username, postHeader, postText, postDate) VALUES (?,?,?,NOW())`,
                [username, postHeader, postText],
            );
            return res.redirect(`/post?id=${result.insertId}`);
        } catch (error) {
            console.error('Post POST error:', error); // Post-ception strikes even more.
            sendWebResponse(res, 500, 'text/plain', '500 Internal Server Error');
        }
    }
}

// Questioning use, may be best as a seperate function inside /methods. - LJ.
export function createCommentPostHandler(db) {
    return async function handleCommentPost(req, res) {
        try {
            const { postId, commentText } = req.body;

            if (!isValidComment(commentText)) {
                return sendWebResponse(res, 400, 'text/plain', 'Invalid comment');
            }

            db.query(
                "INSERT INTO comments (post_id, content) VALUES (?, ?)",
                [postId, commentText],
                (err) => {
                    if (err) {
                        console.error('Comment POST error:', err);
                        return sendWebResponse(res, 500, 'text/plain', 'Database error');
                    }

                    res.redirect(`/post?id=${postId}`);
                }
            );
        } catch (error) {
            console.error('Comment POST error:', error);
            sendWebResponse(res, 500, 'text/plain', 'Server error');
        }
    }
}


/*const postId = currButton.dataset.postId;
    const res = await fetch("/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({postId})
    });
    const data = await res.json();

    const postId = currDislikeButton.dataset.postId;
    const rest = await fetch("/dislike", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({postId})
    });
    const data = await rest.json();
    currDislikes.innerHTML = data.likes;*/
