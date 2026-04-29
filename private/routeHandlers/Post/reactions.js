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
    const {id, action} = req.body;
    const username = req.user?.username || "testUser" ;

    
      console.log("REACT HIT:", action);

      const[rows] = await db.query(
        "SELECT type FROM userLikesDislikes WHERE id = ? AND username = ?",
        [id, username]     
      );

      let userReaction = "none" ;
      if (rows.length > 0) {
        const current = rows[0].type ;

        if(current === action) { // Unlike, Undislike
          await db.query (
            "DELETE FROM userLikesDislikes WHERE id = ? AND username = ?" ,
            [id , username]
          );
          userReaction = "none";
        } else { //swap like for dislike and vice versa.
          await db.query ( 
            "UPDATE userLikesDislikes SET type = ? WHERE id = ? AND username = ?",
            [action, id, username]
          );
          userReaction = action ;
        }
      } else { //like, Dislike
        await db.query(
          "INSERT INTO userLikesDislikes (id, username, type) VALUES (?, ?, ?)",
          [id, username, action]
        );
        userReaction = action;
      }
      const [[{likes}]] = await db.query(
        "SELECT COUNT(*) AS likes FROM userLikesDislikes WHERE id = ? AND type ='like' ",
        [id]
      );
      
      const [[{dislikes}]] = await db.query(
        "SELECT COUNT(*) AS dislikes FROM userLikesDislikes WHERE id = ? AND type ='dislike' ",
        [id]
      );
      res.json({likes, dislikes, userReaction});
    }
    catch (error){
      console.error("ERROR:" , error );
      res.status(500).json({error: "fail"});
    }
  }
};