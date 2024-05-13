import { Criteria } from "../../structure/entities/Criteria";

export interface ICriteriaRepo {
    get_all_criteria(): Promise<Criteria[]>;
    create_criteria(criteria: Criteria): Promise<Criteria>;
}