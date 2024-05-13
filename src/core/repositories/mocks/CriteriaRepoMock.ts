import { ICriteriaRepo } from "../interfaces/ICriteriaRepo";
import { Criteria } from "../../structure/entities/Criteria";
import { CriteriaMock } from "../../structure/mocks/CriteriaMock";

export class CriteriaRepoMock implements ICriteriaRepo {
    private criteria_mock: CriteriaMock

    constructor() { 
        this.criteria_mock = new CriteriaMock();
    }

    public async get_all_criteria(): Promise<Criteria[]> {
        return this.criteria_mock.criterias;
    }

    public async create_criteria(criteria: Criteria): Promise<Criteria> {
        this.criteria_mock.criterias.push(criteria);
        return criteria;
    }
}