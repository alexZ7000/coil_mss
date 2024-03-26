import { EntityError } from "../../helpers/errors/EntityError";


export interface FeedbackProps {
    id: string;
    project_id: string;
    user_id: string;
    feedback: string;
    value: number;
    created_at: Date;
}

export class Feedback {
    id: string;
    project_id: string;
    user_id: string;
    feedback: string;
    value: number;
    created_at: Date;

    constructor({ id, project_id, user_id, feedback, value, created_at }: FeedbackProps) {
        this.id = this.validate_set_id(id);
        this.project_id = this.validate_set_id(project_id);
        this.user_id = this.validate_set_id(user_id);
        this.feedback = this.validate_set_feedback(feedback);
        this.value = this.validate_set_value(value);
        this.created_at = this.validate_set_created_at(created_at);
    }

    private validate_set_id(id: string) {
        if (id == null) {
            throw new EntityError("Parameter id is required");
        }
        if (typeof id !== "string") {
            throw new EntityError("Parameter id must be a string");
        }
        if (id.length !== 36) {
            throw new EntityError("Parameter id must be a valid UUID string");
        }
        return id;
    }

    private validate_set_feedback(feedback: string) {
        if (feedback == null) {
            throw new EntityError("Parameter feedback is required");
        }
        if (typeof feedback !== "string") {
            throw new EntityError("Parameter feedback must be a string");
        }
        return feedback;
    }

    private validate_set_value(value: number) {
        if (value == null) {
            throw new EntityError("Parameter value is required");
        }
        if (typeof value !== "number") {
            throw new EntityError("Parameter value must be a number");
        }
        if (value < 0 || value > 5) {
            throw new EntityError("Parameter value must be between 0 and 5");
        }
        return value;
    }

    private validate_set_created_at(created_at: Date) {
        if (created_at == null) {
            throw new EntityError("Parameter created_at is required");
        }
        if (!(created_at instanceof Date)) {
            throw new EntityError("Parameter created_at must be a Date");
        }
        return created_at;
    }
}