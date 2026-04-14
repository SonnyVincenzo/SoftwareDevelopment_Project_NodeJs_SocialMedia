import express from 'express';
import 'dotenv/config'; // Environment variables.
import db from './private/db/connection.js';

// Routers:
import pageRouter from './private/routers/pageRouter.js';
import authRouter from './private/routers/authRouter.js';
import userRouter from './private/routers/userRouter.js';

const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Send web request to routes and nestled routes.
app.use('/public', express.static('public')); // Static files (CSS+JS)
app.use(express.urlencoded({ extended: true })); // Enabling url form data.
app.use('/', pageRouter); // Router for endpoints within first order.
app.use('/auth', authRouter); // Router for nestled endpoints within second order of auth (/auth/login).
app.use('/user', userRouter); // Router for nestled endpoints within second order of user (/user/username).

app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});