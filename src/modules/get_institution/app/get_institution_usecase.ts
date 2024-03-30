import { Institution } from "../../../core/repositories/database/models/Models";
import { IInstitutionRepo } from "../../../core/repositories/interfaces/IInstitutionRepo";
import { ConflictError, InvalidRequest, MissingParameter, UserNotAuthenticated } from '../../../core/helpers/errors/ModuleError';
import { EntityError } from '../../../core/helpers/errors/EntityError';

export class GetInstitutionUsecase {
    public database_repo: IInstitutionRepo;
    
    constructor(database_repo: IInstitutionRepo) {
        this.database_repo = database_repo;
    }

    public async execute(id: string) {
        const institution = await this.database_repo.get_institution(id); 
        if (!institution) {
            throw new EntityError("Institution not found");
        }

        return institution;
    }
}