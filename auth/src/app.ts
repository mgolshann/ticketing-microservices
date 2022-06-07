import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session'

require('dotenv').config();

// Error Classes
import { NotFoundError } from './errors/not-found-error';

// Middlewares
import { errorHandler } from './middlewares/error-handler';

// User routes
import { SignupRouter } from './routes/signup';
import { SigninRouter } from './routes/signin';
import { SignoutRouter } from './routes/signout';
import { currentUserRouter } from './routes/current-user';

// Initiating express
const app = express();

// Trust incoming request form ingress controller
app.set('trust proxy', true);

app.use(json());

// Configuration Cookie Session
app.use(
    cookieSession({
        keys: ['mgbg'],
        secure: true, 
        signed: true,
        // Cookie Options
        //maxAge: 24 * 60 * 60 * 1000 // 24 hours
    })
);

// User routes
app.use(currentUserRouter);
app.use(SignupRouter);
app.use(SigninRouter);
app.use(SignoutRouter);

// Handling not found routes
app.all('*', async (req, res) => {
    throw new NotFoundError();
});

// This line of code sould be placed at the bottom of routes
app.use(errorHandler);

export { app }