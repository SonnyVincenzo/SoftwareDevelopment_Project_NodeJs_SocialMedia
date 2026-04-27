import { sendWebResponse } from '../../methods/responseMethods.js';
import { loadHtml } from '../../methods/utilsMethods.js';
import { replaceDangerousChars, formatPostToHtml } from '../../methods/postMethods.js';

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
            // Find if user actually exists.
            const users = await mysqlQueryFix(db,
                'SELECT username, joinDate FROM User WHERE username = ?',
                [username]
            );
            if (!users || users.length === 0) {
                return sendWebResponse(res, 404, "text/plain", "404 user not found");
            }

            // Get user's posts.
            const posts = await mysqlQueryFix(db,
                `SELECT * FROM Posts WHERE username = ? ORDER BY postDate DESC`,
                [username]
            );

            let template = await loadHtml("user.html");
            const fullName = username; // Temp fallback for fullName.

            // Build posts html.
            let postHtml;
            if (!posts || posts.length === 0) {
                postHtml = "<p>No posts yet.</p>";
            }
            postHtml = formatPostToHtml(posts);

            // Replace backend placeholders with real values.
            template = template.replace("%%fullName%%", replaceDangerousChars(fullName));
            template = template.replace("%%username%%", `@${replaceDangerousChars(username)}`);
            template = template.replace("%%posts%%", postHtml);

            return sendWebResponse(res, 200, "text/html", template);
        } catch (error) {
            console.error('User error:', error);
            sendWebResponse(res);
        }
    };
}