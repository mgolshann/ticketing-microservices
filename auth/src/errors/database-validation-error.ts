import { ValidationError } from 'express-validator';

export class DatabaseValidationError extends Error {
    reason = 'unable connect to DB';

    constructor() {
        super();

        Object.setPrototypeOf(this, DatabaseValidationError.prototype);
    }
}