import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';


import { currentUserRouter } from './routes/current-user';
import { SignupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.use(json());


// All user routes
app.use(currentUserRouter);
app.use(SignupRouter);


// Handling not found routes
app.all('*', async (req, res) => {
    throw new NotFoundError();
});

// This line of code sould be placed at the bottom of routes
app.use(errorHandler);


app.listen(3000, () => { console.log("Listening on port 3000!") });