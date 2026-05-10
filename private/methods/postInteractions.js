
/*export async function handlePostLike(req, res,db) {
    try
    {
        const { postId } = req.body;

        await db.execute(
            "UPDATE posts SET likes = likes + 1 WHERE id = ?",
            [postId]
        );
        const [rows] = await db.execute (
            "SELECT likes FROM posts WHERE id = ?",
            [postId]
        );

        res.json({likes: rows[0].likes});
    }
    catch(err)
    {
        console.error(err);
        res.status(500).json({ error: "Like failed"});
    }
}

export async function handlePostDislike(req,res,db)
{
    try{
        const {postId} = req.body;

        await db.execute(
            "UPDATE posts SET dislikes = dislikes + 1 WHERE id = ?",
            [postId]
        );
        const [rows] = await db.execute(
            "SELECT dislikes FROM posts WHERE id = ?",
            [postId]
        );
        res.json({dislikes: rows[0].dislikes});
    }
    catch(err)
    {
        console.error(err);
        res.status(500).json({error: "Dislikes failed"});
    }
}*/