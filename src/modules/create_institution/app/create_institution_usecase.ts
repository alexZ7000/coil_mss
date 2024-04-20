import { randomUUID } from 'crypto';
import { Institution } from "../../../core/structure/entities/Institution";
import { MissingParameter, UserNotAuthenticated } from '../../../core/helpers/errors/ModuleError';
import { IInstitutionRepo } from '../../../core/repositories/interfaces/IInstitutionRepo';
import { IUserRepo } from '../../../core/repositories/interfaces/IUserRepo';
import { UserTypeEnum } from '../../../core/helpers/enums/UserTypeEnum';
import jwt from 'jsonwebtoken';

export class CreateInstitutionUsecase {
    public database_repo: IInstitutionRepo;
    public user_repo: IUserRepo;

    constructor(database_repo: IInstitutionRepo, user_repo: IUserRepo) {
        this.database_repo = database_repo;
        this.user_repo = user_repo;
    }

    public async execute(institution: Institution, headers: any){
        if (!headers.authorization) {
            throw new MissingParameter("Authorization");
        }
        
        const decodedToken = jwt.verify(headers.authorization, process.env.JWT_SECRET as string);
        const userId = decodedToken;
        
        
        const userExists = await this.user_repo.get_user(headers.authorization);
        if (!userExists || userExists.user_type !== UserTypeEnum.ADMIN && userExists.user_type !== UserTypeEnum.MODERATOR) {
            throw new UserNotAuthenticated("User is not authenticated");
        }

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