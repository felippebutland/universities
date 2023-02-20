export class UnauthorizedError extends Error {
    constructor(message: string, public objectResponse?: any) {
        super(message);
        this.name = "UnauthorizedError";
    }
}
