import express, { Request, Response} from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@mgbg_tickets/common';

import { Ticket } from '../models/ticket';

const router = express.Router();

router.post('/api/tickets', 
    requireAuth,
    [
        body('title').not().isEmpty().withMessage('email is provided!'),
        body('price').isFloat({ gt: 0 }).withMessage('email is provided!')
    ], 
    validateRequest,
    async (
        req: Request, 
        res: Response
    ) => {

        // req.currentuser is exist when the app is initilize in /app.ts
        // so we easily get the userId from req.currentuser.id
        const { title, price } = req.body;
        const ticket = Ticket.build({ 
            title, 
            price, 
            userId: req.currentuser!.id
        });
        try {
            
            await ticket.save()
            res.status(201).send(ticket)
        
        } catch (err) {
        
            console.log(err);
            return res.status(400).send({ message: err })
        
        }   
});

export { router as createTicketRouter }