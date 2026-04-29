import mysql from 'mysql2/promise';
import 'dotenv/config';


//Connect to the actual db 
const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    multipleStatements: true
});


//Create db if it doesnt exist
let createQuery = "CREATE DATABASE IF NOT EXISTS" + "`" + `${process.env.DB_NAME}` + "`" + ";";
await db.query(createQuery);

// Switch to the db
await db.changeUser({
    database: process.env.DB_NAME
});

console.log('Connected to MySQL database: ', process .env.DB_NAME);
export default db;