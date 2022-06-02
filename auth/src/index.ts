import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session'
const mongoose = require("mongoose");
    
import { currentUserRouter } from './routes/current-user';
import { SignupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

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

    try {
        await mongoose.connect(`mongodb://auth-mongo-srv:27017/auth`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (err) {
        console.error(err)
    }
    
    app.listen(3000, () => { 
        console.log("Listening on port 3000 !!!") 
    });
}

start();