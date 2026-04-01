import express from 'express';
import 'dotenv/config'; // Environment variables.

// Routers:
import pageRouter from './routers/pageRouter.js';
import authRouter from './routers/authRouter.js';
import userRouter from './routers/userRouter.js'

const app = express();
const port = process.env.SERVER_PORT;

// Static files. (CSS+JS)
app.use(express.static('public'));

// Send web request to routes and nestled routes.
app.use('/', pageRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});