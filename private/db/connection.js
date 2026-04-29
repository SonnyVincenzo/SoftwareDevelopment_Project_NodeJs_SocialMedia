import mysql from 'mysql2/promise';
import 'dotenv/config';


//Connect before db creation
const initConnection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,

});

//Create db if it doesnt exist
await initConnection.query(
    `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`
);

//Connect to the actual db 
const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true
});

console.log('Connected to MySQL.');
export default db;