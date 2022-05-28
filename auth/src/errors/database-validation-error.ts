import { ValidationError } from 'express-validator';

export class DatabaseValidationError extends Error {
    statusCode = 500;
    reason = 'unable connect to DB 4';

    constructor() {
        super();

        Object.setPrototypeOf(this, DatabaseValidationError.prototype);
    }

    serializeError() {
        return [
            { message: this.reason }
        ]
    }
}