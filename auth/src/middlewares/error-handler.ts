import { Request, Response, NextFunction } from "express";

// reason to use error-handler
// 1- be able to handle all error not just incoming request
// 2- attach custom error message to the error
// 3- handling multi errors for each scenario


import { CustomError } from '../errors/custom-error';

export const errorHandler = (
    err: Error, 
    req: Request, 
    res: Response, 
    next: NextFunction
) => {

    if (err instanceof CustomError) {
        return res.status(err.statusCode).send({ errors: err.serializeError() });
    }

    res.status(400).send({
        errors: [{ message: 'Something went wrong' }]
    })
}