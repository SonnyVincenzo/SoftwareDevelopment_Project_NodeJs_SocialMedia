import { db } from '../db/table.likesDislikes.js'
/**
 * Handles index page request. (GET / || GET /index)
 *
 * @async
 * @param {import('express').Request} req - Input from browser; ex: url, query.
 * @param {import('express').Response} res - Output from browser; ex: text/html.
 */

export async function reactions(req, res) {
    const {id, action} = req.body;
    //const username = req.user.username ;
    const username = "testUser";

    const[rows] = await db.query(
      "SELECT type FROM likesDislikes WHERE id = ? AND username = ?",
      [id, username]     
    );

    let userReaction = "none" ;
    if (rows.length > 0) {
      const current = rows[0].type ;

      if(current === action) {
        await db.query (
          "DELETE FROM likesDislikes WHERE id = ? AND username = ?" ,
          [id , username]
        );
        userReaction = "none";
      } else {
        await db.query (
          "UPDATE likesDislikes SET type = ? WHERE id = ? AND username = ?",
          [action, id, username]
        );
        userReaction = action ;
      }
    } else {
      await db.query(
        "INSERT INTO likesDislikes (id, username, type) VALUES (?, ?, ?)",
        [id, username, action]
      );
      userReaction = action;
    }
    const [[{likes}]] = await db.query(
      "SELECT COUNT(*) AS likes FROM likesDislikes WHERE id = ? AND type ='like' ",
      [id]
    );
    
    const [[{dislikes}]] = await db.query(
      "SELECT COUNT(*) AS dislikes FROM likesDislikes WHERE id = ? AND type ='dislike' ",
      [id]
    );
    res.json({likes, dislikes, userReaction});
  };