import { User } from "../../../core/structure/entities/User";
import { TokenAuth } from "../../../core/helpers/functions/token_auth";
import { IUserRepo } from "../../../core/repositories/interfaces/IUserRepo";
import { InvalidRequest, MissingParameter, UserNotAuthenticated } from "../../../core/helpers/errors/ModuleError";


export class GetUserUsecase {
  public token_auth: TokenAuth;
  public database_repo: IUserRepo;

  constructor(database_repo: IUserRepo) {
    this.token_auth = new TokenAuth();
    this.database_repo = database_repo;
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

    const user = await this.database_repo.get_user(user_id);
    if (!user) {
      throw new UserNotAuthenticated();
    }

    return user.to_json();
  }
}
