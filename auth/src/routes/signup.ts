import express, { Request, Response} from 'express';
import { body, validationResult } from 'express-validator';

import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseValidationError } from '../errors/database-validation-error';

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
]
, async (req: Request, res: Response) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }
    
    // Getting properties from body request
    const { email, password } = req.body;

    // Looking for user to check if user exist or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        console.log('Email in use !!');
        return res.send({ message: 'Email in use !!'});
    }

    // Adding new user
    const user = User.build({ email, password });
    try {
        await user.save();
    } catch (err) {
        console.log(err);
        return res.status(201).send({ message: err })
    }
    
    // Sending successfull message to the front-end 
    res.status(201).send({ message: 'User successfully added' });
});

export { router as SignupRouter };