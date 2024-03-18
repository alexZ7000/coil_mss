import { MainError } from './MainError';

export class EntityError extends MainError {
    constructor(message: string) {
        super("EntityError: " + message);
    }
}