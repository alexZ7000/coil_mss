import { EntityError } from "../../helpers/errors/EntityError";


class CriteriaProps{
    id: string;
    project_id: string;
    criteria: string;
}

export class Criteria{
    id: string;
    project_id: string;
    criteria: string;

    constructor({id, project_id, criteria}: CriteriaProps) {
        this.id = this.validate_set_id(id);
        this.project_id = this.validate_set_id(project_id);
        this.criteria = this.validate_set_criteria(criteria);
    }

    public to_json() {
        return {
            id: this.id,
            project_id: this.project_id,
            criteria: this.criteria
        }
    }

    private validate_set_id(id: string) {
        if (id == null || id == "") {
            throw new EntityError("Parameter id is required");
        }
        if (typeof id !== "string") {
            throw new EntityError("Parameter id is not a string");
        }
        if (id.length != 36) {
            throw new EntityError("Parameter id is not a valid UUID string");
        }
        return id;
    }

    private validate_set_criteria(criteria: string) {
        if (criteria == null || criteria == "") {
            throw new EntityError("Parameter criteria is required");
        }
        if (typeof criteria !== "string") {
            throw new EntityError("Parameter criteria is not a string");
        }
        return criteria;
    }
}