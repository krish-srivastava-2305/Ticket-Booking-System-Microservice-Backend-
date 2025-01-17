import { CustomError } from "./custom-error";

export class NotAuthorizedError extends CustomError {
    statusCode = 401;
    message = "Not logged in";
    constructor() {
        super("Not logged in");
        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }
    serializeErrors() {
        return [{message: this.message}];
    }
}