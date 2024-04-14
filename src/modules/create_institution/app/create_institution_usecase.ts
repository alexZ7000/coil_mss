import { randomUUID } from 'crypto';
import { Institution } from "../../../core/structure/entities/Institution";
import { MissingParameter } from '../../../core/helpers/errors/ModuleError';
import { IInstitutionRepo } from '../../../core/repositories/interfaces/IInstitutionRepo';

export class CreateInstitutionUsecase {
    public database_repo: IInstitutionRepo;

    constructor(database_repo: IInstitutionRepo) {
        this.database_repo = database_repo;
    }

    public async execute(institution: Institution){
        if (!institution.name) {
            throw new MissingParameter("Name");
        }
        if (!institution.description) {
            throw new MissingParameter("Description");
        }
        if (!institution.email) {
            throw new MissingParameter("Email");
        }
        if (!institution.country) {
            throw new MissingParameter("Country");
        }
        if (!institution.images) {
            throw new MissingParameter("Images");
        }
        if (!institution.social_medias) {
            throw new MissingParameter("Social Medias");
        }

        institution.id = randomUUID();

        const create_institution = await this.database_repo.create_institution(institution);
        return create_institution;
    }
}