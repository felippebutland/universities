export class PropertyRequiredError extends Error {
    constructor(message: string, public objectResponse?: any) {
        super(message);
        this.name = "PropertyRequiredError";
    }
}
