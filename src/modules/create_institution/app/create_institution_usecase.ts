import { randomUUID } from 'crypto';
import { Institution } from "../../../core/structure/entities/Institution";
import { MissingParameter, UserNotAuthenticated } from '../../../core/helpers/errors/ModuleError';
import { IInstitutionRepo } from '../../../core/repositories/interfaces/IInstitutionRepo';
import { IUserRepo } from '../../../core/repositories/interfaces/IUserRepo';
import { TokenAuth } from "../../../core/helpers/functions/token_auth";

export class CreateInstitutionUsecase {
    public database_repo: IInstitutionRepo;
    public user_repo: IUserRepo;
    public token_auth: TokenAuth;

    constructor(database_repo: IInstitutionRepo, user_repo: IUserRepo) {
        this.database_repo = database_repo;
        this.user_repo = user_repo;
        this.token_auth = new TokenAuth();
    }

    public async execute(institutionData: any, headers: any){
        if (!headers.Authorization) {
            throw new MissingParameter("Authorization");
        }
        
        const user_id = await this.token_auth
        .decode_token(headers.Authorization)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          throw new UserNotAuthenticated("Invalid or expired token");
        });
  
      const user = await this.user_repo.get_user(user_id);
      if (!user) {
        throw new UserNotAuthenticated();
      }

        if (!institutionData.name) {
            throw new MissingParameter("Name");
        }
        if (!institutionData.description) {
            throw new MissingParameter("Description");
        }
        if (!institutionData.email) {
            throw new MissingParameter("Email");
        }
        if (!institutionData.country) {
            throw new MissingParameter("Country");
        }
        if (!institutionData.images) {
            throw new MissingParameter("Images");
        }
        if (!institutionData.social_medias) {
            throw new MissingParameter("Social Medias");
        }

        const institution = new Institution({
            id: randomUUID(),
            name: institutionData.name,
            description: institutionData.description,
            email: institutionData.email,
            country: institutionData.country,
            images: institutionData.images,
            social_medias: institutionData.social_medias
        });

        const create_institution = await this.database_repo.create_institution(institution);
        return create_institution;
    }
}