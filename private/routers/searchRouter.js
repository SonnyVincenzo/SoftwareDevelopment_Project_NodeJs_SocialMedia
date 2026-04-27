import express from 'express';
const router = express.Router();

//import the database
import db from '../db.js';

//runs when user goes to search
router.get('/', async(req, res) => {
    const query = req.query.q;

    if(!query)
    {
        return res.json({users: [], posts: []});
    }

    try{
        //search users
        const [users] = await db.execute(
            "SELECT id, username FROM users WHERE username LIKE ? LIMIT 10",
            [`%{query}%`]
        );
        //search posts
        const [posts] = await db.execute (
            "SELECT id, content FROM posts WHERE content LIKE ? LIMIT 10",
            [`%{query}%`]
        );
        //send results back
        res.json({users, posts});
    }
    catch(err){
        console.error(err);
        res.status(500).json({error: "Search failed"});
    }
});
