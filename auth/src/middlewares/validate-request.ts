import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import { RequestValidationError } from '../errors/request-validation-error';


// the reason that is not similar to ErrorHandling is that 
// we are not going to catch the error but we are going to 
// produce error so in result we are not going to use Error 
// argument in validate-request
export const validateRequest = (
    req: Request, 
    res: Response, 
    next: NextFunction
    ) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());
        }
        next();
}