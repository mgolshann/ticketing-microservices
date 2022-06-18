import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
var cookieSession = require('cookie-session')

const cors = require('cors');
require('dotenv').config();

// Initiating express
const app = express();

// Trust incoming request form ingress controller
app.set('trust proxy', true);

app.use(json());
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3001',
  }),
);
  
// Ticket Modules
import { currentuser } from '@mgbg_tickets/common';
import { createTicketRouter } from './routes/new'
import { showTicketRouter } from './routes/show';
import { indexTicketRouter } from './routes/index';
import { updateTicketRouter } from './routes/update';

// Error Classes
import { NotFoundError, errorHandler } from '@mgbg_tickets/common';


// Configuration Cookie Session
// secure: only share cookie with https connection
// supertest not making https instead it use connection
// so we tell run jest only when it's not in test mode
app.use(
  cookieSession({
    secret: 'yourSecret',
    secure: false,
    httpOnly: false,
    sameSite: false,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }),
);

// Ticket Routes
app.use(currentuser)
app.use(createTicketRouter)
app.use(showTicketRouter);
app.use(indexTicketRouter)
app.use(updateTicketRouter);

// Handling not found routes
app.all('*', async (req, res) => {
    throw new NotFoundError();
});

// This line of code sould be placed at the bottom of routes
app.use(errorHandler);

export { app }