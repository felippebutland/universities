export class PropertyInvalidValueError extends Error {
    constructor(message: string, public objectResponse?: any) {
        super(message);
        this.name = "PropertyInvalidValueError";
    }
}
