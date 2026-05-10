/**
 * Handles index page request. (GET / || GET /index)
 *
 * @async
 * @param {import('express').Request} req - Input from browser; ex: url, query.
 * @param {import('express').Response} res - Output from browser; ex: text/html.
 */


export function reactions(db) {
	return async (req, res) => {
		try {
			const { id, postId, action } = req.body;
			const targetId = postId || id;
			const username = req.session.userId;
			if (!username) {
				return res.status(401).json({ error: "Not logged in" });
			} // Fail case, no update in db (not logged in).

			const [rows] = await db.query(
<<<<<<< HEAD:private/routeHandlers/Post/reactions.js
				"SELECT type FROM user_likes_dislikes WHERE id = ? AND username = ?",
				[id, username]
=======
				"SELECT type FROM userLikesDislikes WHERE id = ? AND username = ?",
				[targetId, username]
>>>>>>> origin/main:private/methods/post/reactions.js
			);

			let userReaction = "none";
			if (rows.length > 0) {
				const current = rows[0].type;

				if (current === action) { // Unlike, Undislike
					await db.query(
<<<<<<< HEAD:private/routeHandlers/Post/reactions.js
						"DELETE FROM user_likes_dislikes WHERE id = ? AND username = ?",
						[id, username]
=======
						"DELETE FROM userLikesDislikes WHERE id = ? AND username = ?",
						[targetId, username]
>>>>>>> origin/main:private/methods/post/reactions.js
					);
					userReaction = "none";
				} else { //swap like for dislike and vice versa.
					await db.query(
<<<<<<< HEAD:private/routeHandlers/Post/reactions.js
						"UPDATE user_likes_dislikes SET type = ? WHERE id = ? AND username = ?",
						[action, id, username]
=======
						"UPDATE userLikesDislikes SET type = ? WHERE id = ? AND username = ?",
						[action, targetId, username]
>>>>>>> origin/main:private/methods/post/reactions.js
					);
					userReaction = action;
				}
			} else { //like, Dislike
				await db.query(
<<<<<<< HEAD:private/routeHandlers/Post/reactions.js
					"INSERT INTO user_likes_dislikes (id, username, type) VALUES (?, ?, ?)",
					[id, username, action]
=======
					"INSERT INTO userLikesDislikes (id, username, type) VALUES (?, ?, ?)",
					[targetId, username, action]
>>>>>>> origin/main:private/methods/post/reactions.js
				);
				userReaction = action;
			}
			const [[{ likes }]] = await db.query(
<<<<<<< HEAD:private/routeHandlers/Post/reactions.js
				"SELECT COUNT(*) AS likes FROM user_likes_dislikes WHERE id = ? AND type ='like' ",
				[id]
			);

			const [[{ dislikes }]] = await db.query(
				"SELECT COUNT(*) AS dislikes FROM user_likes_dislikes WHERE id = ? AND type ='dislike' ",
				[id]
=======
				"SELECT COUNT(*) AS likes FROM userLikesDislikes WHERE id = ? AND type ='like' ",
				[targetId]
			);

			const [[{ dislikes }]] = await db.query(
				"SELECT COUNT(*) AS dislikes FROM userLikesDislikes WHERE id = ? AND type ='dislike' ",
				[targetId]
>>>>>>> origin/main:private/methods/post/reactions.js
			);
			res.json({ likes, dislikes, userReaction });
		}
		catch (error) {
			console.error("ERROR:", error);
			res.status(500).json({ error: "fail" });
		}
	}
};