import {
  InvalidRequest,
  MissingParameter,
  UserNotAuthenticated,
} from "../../../core/helpers/errors/ModuleError";
import { TokenAuth } from "../../../core/helpers/functions/token_auth";
import { IInstitutionRepo } from "../../../core/repositories/interfaces/IInstitutionRepo";

export class UpdateInstitutionUsecase {
  public token_auth: TokenAuth;
  public database_repo: IInstitutionRepo;

  constructor(database_repo: IInstitutionRepo) {
    this.token_auth = new TokenAuth();
    this.database_repo = database_repo;
  }

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

    const institution_id = await this.token_auth
    .decode_token(headers.Authorization)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw new UserNotAuthenticated("Invalid or expired token");
    });

    const institution = await this.database_repo.get_institution(institution_id)
    if(!institution){
      throw new UserNotAuthenticated();
    }

    const updateInstitution = await this.database_repo.update_institution(institution);

    
    return institution;
  }

}