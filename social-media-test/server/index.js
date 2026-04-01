//libraries
const express = require("express"); //backend server
const cors    = require("cors"); //react and backend cooperation
const mysql   = require("mysql2"); //node.js and mysql cooperation

//create app and set the port
const app     = express();
const PORT    = 5000;

app.use(cors());
app.use(express.json());

//create the connection with the MySQL database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Gabagool123!",
    database: "social_test"
});

db.connect((err) =>{
    if (err) {
        console.error("Database connection failed:", err)
        return;
    }
    console.log("Connected to MySQL");
})

//query the posts from newest to oldest on the website
app.get("/posts", (req, res) => {

    db.query("SELECT * FROM posts ORDER BY created_at DESC", (err, results) => {
        if (err){
            console.error(err);
            return res.status(500).json({ error: "Failed to fetch posts"});
        }    
        res.json(results);
    });
});

//insert posts into database and website
app.post("/posts", (req, res) => {
    const { content }  = req.body;

    //can not create a post that is empty or has only spaces
    if(!content || !content.trim()){
        return res.status(400).json({ error: "Content is required" });
    }

    db.query(
        "INSERT INTO posts (content) VALUES (?)",
        [content],
        (err, result) => {
            if (err){
                console.error(err);
                return res.status(500).json({ error: "Failed to create post"});
            }

            res.status(201).json({
                message: "Post created successfully",
                post_id: result.insertId,
            });
        }
    );
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});



