import { CustomError } from "./custom-error";
    
export class DbConnectionError extends CustomError {
    statusCode = 500;
    constructor() {
        super("Error connecting to database");
        Object.setPrototypeOf(this, DbConnectionError.prototype);
    }
    serializeErrors() {
        return [{message: "Error connecting to database"}];
    }
}