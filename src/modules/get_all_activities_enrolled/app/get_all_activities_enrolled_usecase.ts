import { ActivityStatusEnum } from "../../../core/helpers/enums/ActivityStatusEnum";
import { UserTypeEnum } from "../../../core/helpers/enums/UserTypeEnum";
import { IActivityRepo } from "../../../core/repositories/interfaces/IActivityRepo";
import { IUserRepo } from "../../../core/repositories/interfaces/IUserRepo";
import {
  InvalidParameter,
  InvalidRequest,
  MissingParameter,
  UserNotAllowed,
  UserNotAuthenticated,
} from "../../../core/helpers/errors/ModuleError";
import { TokenAuth } from "../../../core/helpers/functions/token_auth";
import { NotFound } from "../../../core/helpers/http/http_codes";

export class GetAllActivitiesEnrolledUsecase {
  public token_auth: TokenAuth;
  public user_repo: IUserRepo;
  public activity_repo: IActivityRepo;

  constructor(user_repo: IUserRepo, activity_repo: IActivityRepo) {
    this.token_auth = new TokenAuth();
    this.user_repo = user_repo;
    this.activity_repo = activity_repo;
  }

  async execute(
    headers: { [key: string]: any },
    queryStringParameters: { [key: string]: any }
  ) {
    if (!headers) {
      throw new InvalidRequest("Headers");
    }
    if (!headers.Authorization) {
      throw new MissingParameter("Authorization");
    }

    if (!queryStringParameters) {
      throw new InvalidRequest("Query String Parameters");
    }
    if (!queryStringParameters.type_activity) {
      throw new MissingParameter("type_activity");
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

    if (user.user_type !== UserTypeEnum.STUDENT) {
      throw new UserNotAllowed("User is not a student");
    }

    if (!(queryStringParameters.type_activity in ActivityStatusEnum)) {
      throw new InvalidParameter("type_activity", queryStringParameters.type_activity);
    }

    const activities = await this.activity_repo.get_activities_by_user_id(
      user_id,
      queryStringParameters.type_activity
    );
    return activities ? activities.map((activity) => activity.to_json()) : [];
  }
}
