import express from 'express';
import 'dotenv/config'; // Environment variables.
import mysql from 'mysql2';

// Routers:
import pageRouter from './routers/pageRouter.js';
import authRouter from './routers/authRouter.js';
import userRouter from './routers/userRouter.js';

const app = express();
const port = process.env.SERVER_PORT;

//db connection
const db = mysql.createConnection
({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Send web request to routes and nestled routes.
app.use('/public', express.static('public')); // Static files (CSS+JS)
app.use(express.urlencoded({ extended: true })); // Enabling url form data.
//Changed this line so pageRouter has access to the database
app.use('/', pageRouter(db)); // Router for endpoints within first order.
app.use('/auth', authRouter); // Router for nestled endpoints within second order of auth (/auth/login).
app.use('/user', userRouter); // Router for nestled endpoints within second order of user (/user/username).

app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});