import express from 'express';

export default function createSearchRouter(db) {
    const router = express.Router();
    //runs when user goes to search
router.get('/', async(req, res) => {
    const query = req.query.q;

    if(!query)
    {
        return res.json({users: [], posts: []});
    }

    try{
        //checks if user exists
        const [users] = await db.execute(
            "SELECT username FROM User WHERE username = ?",
            [query]
        );
        if(users.length > 0)
        {
            //redirect to profile page
            return res.redirect(`/user/${query}`);
        }
        //search posts
        const [posts] = await db.execute (
            `SELECT id, username, postHeader, postText FROM Posts where postHeader LIKE ? OR postText LIKE ? LIMIT 10`,
            [`%${query}%`, `%${query}%`] 
        );
        //send results back
        res.json({users, posts});
    }
    catch(err){
        console.error(err);
        res.status(500).json({error: "Search failed"});
    }
});
return router;
}


//this is how the url looks like for search
// ../search?q=?