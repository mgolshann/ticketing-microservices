import express, { Request, Response} from 'express';
import { body, validationResult } from 'express-validator';

import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseValidationError } from '../errors/database-validation-error';

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
    
    throw new DatabaseValidationError()
    
    res.status(200).send({});
});

export { router as SignupRouter };