import { i } from "vitest/dist/reporters-LqC_WI4d.js";
import {
  InvalidRequest,
  MissingParameter,
  UserNotAuthenticated,
} from "../../../core/helpers/errors/ModuleError";
import { TokenAuth } from "../../../core/helpers/functions/token_auth";
import { IInstitutionRepo } from "../../../core/repositories/interfaces/IInstitutionRepo";
import { IUserRepo } from "../../../core/repositories/interfaces/IUserRepo";
import { UserTypeEnum } from '../../../core/helpers/enums/UserTypeEnum';
import { NotFound } from "../../../core/helpers/http/http_codes";

export class UpdateInstitutionUsecase {
  public token_auth: TokenAuth;
  public institution_repo: IInstitutionRepo;
  public user_repo: IUserRepo;

  constructor(institution_repo: IInstitutionRepo, user_repo: IUserRepo) {
    this.token_auth = new TokenAuth();
    this.institution_repo = institution_repo;
    this.user_repo = user_repo;
  }

  //To do: 
  public async execute(
    headers: { [key: string]: any },
    body: { [key: string]: any }
  ) {
    if (!headers) {
      throw new InvalidRequest("Headers");
    }
    if (!body) {
      throw new InvalidRequest("Body");
    }
    if (!headers.Authorization) {
      throw new MissingParameter("Authorization");
    }
    if (!body.institution_id) {
      throw new MissingParameter("Missing institution_id");
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
    if (!user || user.user_type !== UserTypeEnum.ADMIN && user.user_type !== UserTypeEnum.MODERATOR) {
      throw new UserNotAuthenticated("User not authorized to update institution.");
    }



    const institution = await this.institution_repo.get_institution(user_id)
    if(!institution){
      throw new NotFound("Institution not found."); 
    }

    
    institution.name = body.name || institution.name;
    institution.description = body.description || institution.description;
    institution.country = body.country || institution.country;
    institution.email = body.email || institution.email;
    institution.country = body.country || institution.country;
    institution.images = body.images || institution.images;
    institution.social_medias = body.social_medias || institution.social_medias;
    

    const updateInstitution = await this.institution_repo.update_institution(institution);

    
    return institution;
  }

}