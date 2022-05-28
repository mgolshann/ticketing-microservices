import { CustomError } from './CustomError';

export class DatabaseValidationError extends Error implements CustomError {
    statusCode = 500;
    reason = 'unable connect to DB';

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