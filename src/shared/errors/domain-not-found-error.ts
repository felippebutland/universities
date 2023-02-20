export class DomainNotFoundError extends Error {
    constructor(message: string, public objectResponse?: any) {
        super(message);
        this.name = "DomainNotFoundError";
    }
}
