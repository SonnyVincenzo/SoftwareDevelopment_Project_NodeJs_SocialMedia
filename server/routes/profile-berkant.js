import { Router } from "express";

const router = Router();

//needs db passed in from server.js
export default function profileRoutes(db) {
  router.get("/:id", (req, res) => {
    const userId = req.params.id;

    //grab whats needed, no pass
    db.query(
      "SELECT id, username FROM users WHERE id = ?",
      [userId],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Database error" });
        }

        if (result.length === 0) {
          return res.status(404).json({ error: "User not found" });
        }

        //send it back
        const user = result[0];
        res.json({
          userId: user.id,
          username: user.username
        });
      }
    );
  });

  return router;
}