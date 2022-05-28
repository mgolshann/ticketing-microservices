export interface CustomError {
    statusCode: number;
    serializeError(): {
        message: string;
        field?: string;
    }[]
}