import express from 'express';
import 'dotenv/config'; // Environment variables.

// Routers:
import pageRouter from './routers/pageRouter.js';
import authRouter from './routers/authRouter.js';
import userRouter from './routers/userRouter.js';

const app = express();
const port = process.env.SERVER_PORT;

// Send web request to routes and nestled routes.
app.use('/public', express.static('public')); // Static files (CSS+JS)
app.use('/', pageRouter); // Router for endpoints within first order.
app.use('/auth', authRouter); // Router for nestled endpoints within second order of auth (/auth/login).
app.use('/user', userRouter); // Router for nestled endpoints within second order of user (/user/username).

app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});