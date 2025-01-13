export abstract class CustomError extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, CustomError.prototype);
    }
    abstract statusCode: number;
    abstract serializeErrors() : {message: string, field?: string}[];
}

