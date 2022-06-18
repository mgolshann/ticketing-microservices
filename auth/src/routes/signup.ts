import express, { Request, Response} from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { validateRequest, BadRequestError } from '@mgbg_tickets/common';

import { User } from '../models/user';

const router = express.Router();

router.post('/api/users/signup', 
[
    body('email')
        .isEmail()
        .withMessage('Provide a valid email'),
    body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20')
],
validateRequest
, async (req: Request, res: Response) => {

    // Getting properties from body request
    const { email, password } = req.body;

    // Looking for user to check if user exist or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new BadRequestError('Email in use !!!');
    }

    // Adding new user
    const user = User.build({ email, password });
    try {
        await user.save();

        const payload = {
            id: user.id,
            email: user.email
        };

        // Generate JWT
        const userJwtToken = jwt.sign(
            payload, 
            process.env.JWT_TOKEN!
        );
        
        // Store in a session object
        req.session = {
            jwt: userJwtToken
        };
        
        // Sending user details to the front-end 
        res.status(201).send(user);

    } catch (err) {
        console.log(err);
        return res.status(400).send({ message: err })
    }   
    

});

export { router as SignupRouter };