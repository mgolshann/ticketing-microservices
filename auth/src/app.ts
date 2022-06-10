import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session'

const cors = require('cors');
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
import { testRouter } from './routes/test';

// Initiating express
const app = express();

// Trust incoming request form ingress controller
app.set('trust proxy', true);

app.use(json());
app.use(cors());

// Configuration Cookie Session
// secure: only share cookie with https connection
// supertest not making https instead it use connection
// so we tell run jest only when it's not in test mode
app.use(
    cookieSession({
        keys: ['mgbg'],
        //secure: process.env.NODE_ENV !== 'test', 
        signed: true,
        // Cookie Options
        // maxAge: 24 * 60 * 60 * 1000 // 24 hours
    })
);


// User routes
app.use(currentUserRouter);
app.use(SignupRouter);
app.use(SigninRouter);
app.use(SignoutRouter);
app.use(testRouter);

// Handling not found routes
app.all('*', async (req, res) => {
    throw new NotFoundError();
});

// This line of code sould be placed at the bottom of routes
app.use(errorHandler);

export { app }