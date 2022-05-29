import { CustomError } from './custom-error';

export class DatabaseValidationError extends CustomError {
    statusCode = 500;
    reason = 'Unable connecting to DB';

    constructor() {
        super('Unable connecting to DB');

        Object.setPrototypeOf(this, DatabaseValidationError.prototype);
    }

    serializeError() {
        return [{ message: this.reason }]
    }
}