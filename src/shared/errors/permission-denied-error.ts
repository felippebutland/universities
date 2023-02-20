export class PermissionDeniedError extends Error {
    constructor(message: string, public objectResponse?: any) {
        super(message);
        this.name = "PermissionDeniedError";
    }
}
