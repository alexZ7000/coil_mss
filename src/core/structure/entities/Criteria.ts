import { EntityError } from "../../helpers/errors/EntityError";


class CriteriaProps{
    id: number;
    criteria: string;
}

export class Criteria{
    id: number;
    criteria: string;

    constructor(props: CriteriaProps) {
        this.id = this.validate_set_id(props.id);
        this.criteria = this.validate_set_criteria(props.criteria);
    }

    public to_json() {
        return {
            id: this.id,
            criteria: this.criteria
        }
    }

    private validate_set_id(id: number) {
        if (id == null || id == undefined) {
            throw new EntityError("Parameter id is required");
        }
        if (typeof id !== "number") {
            throw new EntityError("Parameter id is not a number");
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