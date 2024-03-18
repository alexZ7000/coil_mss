export class MainError extends Error {
    constructor(message: string) {
        super(message)
        this.message = message;
    }
}