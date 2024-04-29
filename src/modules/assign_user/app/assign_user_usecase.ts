import { UserTypeEnum } from "../../../core/helpers/enums/UserTypeEnum";
import {
  InvalidRequest,
  MissingParameter,
  UserNotAllowed,
  UserNotAuthenticated,
} from "../../../core/helpers/errors/ModuleError";
import { TokenAuth } from "../../../core/helpers/functions/token_auth";
import { IUserRepo } from "../../../core/repositories/interfaces/IUserRepo";
import { IActivityRepo } from "../../../core/repositories/interfaces/IActivityRepo";


export class AssignUserUsecase {
  public token_auth: TokenAuth;
  public user_repo: IUserRepo;
  public activity_repo: IActivityRepo;

  constructor(user_repo: IUserRepo, activity_repo: IActivityRepo) {
    this.token_auth = new TokenAuth();
    this.user_repo = user_repo;
    this.activity_repo = activity_repo;
  }

  public async execute(
    headers: { [key: string]: any },
    queryStringParameters: { [key: string]: any }
  ) {
    if (!headers) {
      throw new InvalidRequest("Headers");
    }
    if (!queryStringParameters) {
      throw new InvalidRequest("Query String Parameters");
    }
    if (!headers.Authorization) {
      throw new MissingParameter("Authorization");
    }
    if (!queryStringParameters.activity_id) {
      throw new MissingParameter("Activity ID");
    }

    const activity_id = queryStringParameters.activity_id;

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

    if (user.user_type !== UserTypeEnum.STUDENT) {
      throw new UserNotAllowed();
    }

    return await this.activity_repo.assign_user_to_activity(activity_id, user_id);
  }
}
