const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

app.use(cors());
app.use(express.json());

//DB-connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234", 
  database: "social_test"
});

db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

//for registering endpoint, check for blanks, minimum password length, no duplicates
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (username.trim() === "" || password.trim() === "") {
    return res.status(400).json({ error: "Fields cannot be empty" });
  }

  if (password.length <= 3) {
    return res.status(400).json({ error: "Password must be at least 3 characters" });
  }

  const trimmedUsername = username.trim(); //removes spaces, both at the begining and at the end
  
  db.query(
    "SELECT * FROM users WHERE username = ?",
    [trimmedUsername],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database error (check yo username bruv)" });
      }

      if (result.length > 0) {
        return res.status(400).json({ error: "User already exists" });
      }

      bcrypt.hash(password, saltRounds, (err,hash) =>{
        if(err)
        {
          console.error(err);
          return res.status(500).json({error: "Error Hashing password"});
        }

        db.query(
          "INSERT INTO users (username, password) VALUES (?,?)",
          [trimmedUsername, hash],
          (err, result) => {
            if(err) 
            {
              console.error(err);
              return res.status(500).json({
                error: "Database error (user prolly exists bruv)"});
            }
            res.status(201).json({
              message: "User created successfully", 
              userId: result.insertId
            });
          }
        );
      })
    }
  );
});
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});