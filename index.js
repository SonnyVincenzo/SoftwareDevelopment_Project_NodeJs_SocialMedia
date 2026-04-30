import express from 'express';
import 'dotenv/config'; // Environment variables.
import db from './private/db/connection.js';
import session from 'express-session';
import initializeDatabase from './private/db/init.js';

// Routers:
import createPageRouter from './private/routers/pageRouter.js';
import createAuthRouter from './private/routers/authRouter.js';
import createUserRouter from './private/routers/userRouter.js';



const app = express();
const port = process.env.SERVER_PORT;


app.use(express.json()); // Enables json handling.
app.use(express.urlencoded({ extended: true })); // Enables url form data.
app.use(session({ // Enables sessions for login and user specific data.
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false // Only for HTTPS.
  }
}));

// Send web request to routes and nestled routes.
app.use('/public', express.static('public')); // Static files (CSS+JS)
app.use('/', createPageRouter(db)); // Router for endpoints within first order.
app.use('/auth', createAuthRouter(db)); // Router for nestled endpoints within second order of auth (/auth/login).
app.use('/user', createUserRouter(db)); // Router for nestled endpoints within second order of user (/user/username).



// 404 status case, possibly a revamp into proper frontend status handling.
app.use((req, res) => {
  res.status(404).send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>404 Not Found</title>
      </head>
      <body>
        <h1>404 - Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <a href="javascript:history.back()">Go back</a>
      </body>
    </html>
  `);
});

async function startServer() {
  try {
    await initializeDatabase(db);

    app.listen(port, () => {
      console.log(`Server listening on port ${port}.`);
    });
  } catch (err) {
    console.error("Server failed to start:", err);
    process.exit(1);
  }
}

startServer();