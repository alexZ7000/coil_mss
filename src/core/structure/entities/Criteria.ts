import { EntityError } from "../../helpers/errors/EntityError";


export class Criteria{
    id: string;
    criteria: string;

    constructor({ id, criteria }) {
        this.id = this.validate_set_id(id);
        this.criteria = this.validate_set_criteria(criteria);
    }


    private validate_set_id(id: string) {
        if (id == null || id == "") {
            throw new EntityError("Parameter id is required");
        }
        if (typeof id !== "string") {
            throw new EntityError("Parameter id is not a string");
        }
        if (id.length != 36) {
            throw new EntityError("Parameter id is not a valid UUID");
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