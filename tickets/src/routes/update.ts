import express ,{ Request, Response } from 'express';
import { Ticket } from '../models/ticket';
import { NotFoundError, NotAuthorizedError, requireAuth, validateRequest }  from '@mgbg_tickets/common';
import { body } from 'express-validator';

const router = express.Router();

router.put('/api/tickets/:id', 
requireAuth,
[
    body('title').not().isEmpty().withMessage('Title must be provided!'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be provided and greater than 0')
],
validateRequest,
async (req: Request, res: Response) => {

    const ticket = await Ticket.findById(req.params.id);
    
    if (!ticket){
        throw new NotFoundError();
    }

    // Check if own ticket
    if (ticket.userId !== req.currentuser!.id ) {
        throw new NotAuthorizedError()
    }

    // Update ticket
    ticket.set({
        title: req.body.title,
        price: req.body.price
    });

    await ticket.save();
       
    res.send(ticket)

});

export { router as updateTicketRouter }