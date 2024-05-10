import { TokenAuth } from "../../../core/helpers/functions/token_auth";
import { IUserRepo } from "../../../core/repositories/interfaces/IUserRepo";
import { IInstitutionRepo } from "../../../core/repositories/interfaces/IInstitutionRepo";
import { InvalidRequest, MissingParameter, UserNotAuthenticated } from "../../../core/helpers/errors/ModuleError";


export class GetAllInstitutionsUsecase {
  public token_auth: TokenAuth;
  public user_repo: IUserRepo;
  public institution_repo: IInstitutionRepo;

  constructor(user_repo: IUserRepo, activity_repo: IInstitutionRepo) {
    this.token_auth = new TokenAuth();
    this.user_repo = user_repo;
    this.institution_repo = activity_repo;
  }

  async execute(headers: { [key: string]: any }) {
    if (!headers) {
      throw new InvalidRequest("Headers");
    }
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

    const institutions = await this.institution_repo.get_all_institutions();
    return institutions.map((institution) => {
      return {
        id: institution.id,
        name: institution.name,
        logo: institution.images[0] || null,
        country: institution.country
      };
    }) || [];
  }
}

