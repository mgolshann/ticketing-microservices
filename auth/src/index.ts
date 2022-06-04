import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session'
const mongoose = require("mongoose");

require('dotenv').config();

import { NotFoundError } from './errors/not-found-error';

import { errorHandler } from './middlewares/error-handler';

import { SignupRouter } from './routes/signup';
import { SigninRouter } from './routes/signin'
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


// Handling not found routes
app.all('*', async (req, res) => {
    throw new NotFoundError();
});

// This line of code sould be placed at the bottom of routes
app.use(errorHandler);

// Connecting to mongodb 
const start = async () => {

    if (!process.env.JWT_TOKEN) {
        throw new Error('JWY_TOKEN must be definded');
    }
      
    if (!process.env.MONGO_DB_URI) {
        throw new Error('MONGO_DB_URI must be definded');
    }

    if (!process.env.MONGO_DB_PORT) {
        throw new Error('MONGO_DB_PORT must be definded');
    }

    if (!process.env.MONGO_DB_DATABASE) {
        throw new Error('MONGO_DB_DATABASE must be definded');
    }

    if (!process.env.APP_PORT) {
        throw new Error('APP_PORT must be definded');
    }

    try {
        await mongoose.connect(`mongodb://${process.env.MONGO_DB_URI}:${process.env.MONGO_DB_PORT}/${process.env.MONGO_DB_DATABASE}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (err) {
        console.error(err)
    }
    
    app.listen(process.env.APP_PORT, () => { 
        console.log(`Listening on port ${process.env.APP_PORT} !!!`) 
    });
}

start();