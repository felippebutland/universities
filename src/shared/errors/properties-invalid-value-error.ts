export class PropertiesInvalidValueError extends Error {
    errorMessages: Array<string>;
    name: string;
    constructor(errorMessages: Array<string>) {
        super(Array.isArray(errorMessages) ? errorMessages?.join("; ") : JSON.stringify(errorMessages || ""));
        this.errorMessages = errorMessages;
        this.name = "PropertyInvalidValueError";
    }
}
