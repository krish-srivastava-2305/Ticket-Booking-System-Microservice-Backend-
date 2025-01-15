import { CustomError } from "./custom-error";

export class BadRequestErroor extends CustomError {
    statusCode = 400;

    constructor(public message: string){
        super(message);

        Object.setPrototypeOf(this, BadRequestErroor.prototype);
    }

    serializeErrors() {
        return [{message: this.message}];
    }
}