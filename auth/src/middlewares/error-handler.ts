import { Request, Response, NextFunction } from "express";

// reason to use error-handler
// 1- be able to handle all error not just incoming request
// 2- attach custom error message to the error
// 3- handling multi errors for each scenario


import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseValidationError } from '../errors/database-validation-error';

interface CustomError {

}

export const errorHandler = (
    err: Error, 
    req: Request, 
    res: Response, 
    next: NextFunction
) => {

    if (err instanceof RequestValidationError) {
        res.status(err.statusCode).send({ errors: err.serializeError() });
    }

    if (err instanceof DatabaseValidationError) {
        res.status(err.statusCode).send({ errors: err.serializeError() });
    }

    res.status(400).send({
        errors: [{ message: 'Something went wrong' }]
    })
}