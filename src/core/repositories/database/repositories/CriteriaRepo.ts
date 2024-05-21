import { CriteriaDTO } from "../dtos/CriteriaDTO";
import { Criteria as CriteriaDB } from "../models/Models";
import { ICriteriaRepo } from "../../interfaces/ICriteriaRepo";
import { Criteria } from "../../../structure/entities/Criteria";

export class CriteriaRepo implements ICriteriaRepo {
    private criteriaDTO: CriteriaDTO;

    constructor() {
        this.criteriaDTO = new CriteriaDTO();
    }
    public async get_all_criteria(): Promise<Criteria[]> {
        const criteriaDB = await CriteriaDB.findAll();
        return criteriaDB.map(criteria => this.criteriaDTO.to_entity(criteria.toJSON()));
    }

    public async create_criteria(criteria: Criteria): Promise<Criteria> {
        const criteriaDB = await CriteriaDB.create({
            id: criteria.id,
            criteria: criteria.criteria,
        });
        return this.criteriaDTO.to_entity(criteriaDB.toJSON());
    }
}