import { UserTypeEnum } from "../../../core/helpers/enums/UserTypeEnum";
import {
  InvalidRequest,
  MissingParameter,
  NotfoundError,
  UserNotAuthenticated,
} from "../../../core/helpers/errors/ModuleError";
import { TokenAuth } from "../../../core/helpers/functions/token_auth";
import { IUserRepo } from "../../../core/repositories/interfaces/IUserRepo";

export class DeleteModeratorUsecase {
  public token_auth: TokenAuth;
  public database_repo: IUserRepo;

  constructor(database_repo: IUserRepo) {
    this.token_auth = new TokenAuth();
    this.database_repo = database_repo;
  }

  async execute(
    headers: { [key: string]: any },
    body: { [key: string]: any }
  ) {
    if (!headers) {
      throw new InvalidRequest("Headers");
    }
    if (!headers.Authorization) {
      throw new MissingParameter("Authorization");
    }
    if (!body) {
      throw new MissingParameter("Body");
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

    if (user.user_type !== UserTypeEnum.ADMIN) {
      throw new UserNotAuthenticated();
    }

    const moderator = await this.database_repo.get_user(
      body.moderator_id
    );
    if (!moderator) {
      throw new NotfoundError("Moderator");
    }

    if (moderator.user_type !== UserTypeEnum.MODERATOR) {
      throw new InvalidRequest("User is not a moderator");
    }

    await this.database_repo.delete_moderator(
      body.moderator_id
    );
    return { message: "Moderator deleted successfully" };
  }
}
