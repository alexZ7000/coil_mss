import { Criteria } from "../../../structure/entities/Criteria";

export class CriteriaProps {
    id: number;
    criteria: string;
}

export class CriteriaDTO {

    public to_entity(criteria: CriteriaProps): Criteria {
        return new Criteria({
            id: criteria.id,
            criteria: criteria.criteria
        });
    }
}