import { ValidationError } from 'express-validator';
import { CustomError } from './CustomError';

export class RequestValidationError extends Error implements CustomError {
    statusCode = 400;
    constructor(public errors: ValidationError[]) {
        super()

        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeError() {
        return this.errors.map(error => {
            return { message: error.msg, field: error.param }
        })
    }
}
