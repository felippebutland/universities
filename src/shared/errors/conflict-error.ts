export class ConflictError extends Error {
    constructor(entity: string) {
        super(`${entity} already in use`);
        this.name = "ConflictError";
    }
}
