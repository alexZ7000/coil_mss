import { TokenAuth } from "../../../core/helpers/functions/token_auth";
import { UserTypeEnum } from "../../../core/helpers/enums/UserTypeEnum";
import { IUserRepo } from "../../../core/repositories/interfaces/IUserRepo";
import { ActivityTypeEnum } from "../../../core/helpers/enums/ActivityTypeEnum";
import { ActivityStatusEnum } from "../../../core/helpers/enums/ActivityStatusEnum";
import { IActivityRepo } from "../../../core/repositories/interfaces/IActivityRepo";
import { InvalidParameter, InvalidRequest, MissingParameter, UserNotAuthenticated } from "../../../core/helpers/errors/ModuleError";


export class GetAllActivitiesByStatusUsecase {
  public token_auth: TokenAuth;
  public user_repo: IUserRepo;
  public activity_repo: IActivityRepo;

  constructor(user_repo: IUserRepo, activity_repo: IActivityRepo) {
    this.token_auth = new TokenAuth();
    this.user_repo = user_repo;
    this.activity_repo = activity_repo;
  }

  async execute(headers: { [key: string]: any }, queryStringParameters: { [key: string]: any }) {
    if (!headers) {
      throw new InvalidRequest("Headers");
    }
    if (!headers.Authorization) {
      throw new MissingParameter("Authorization");
    }
    if (!(queryStringParameters.type_activity in ActivityTypeEnum)) {
      throw new InvalidParameter("type_activity", queryStringParameters.type_activity);
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

    let statusAllowed: ActivityStatusEnum[];

    if (user.user_type === UserTypeEnum.STUDENT) {
      statusAllowed = [ActivityStatusEnum.TO_START, ActivityStatusEnum.ACTIVE];
    } else {
      statusAllowed = [ActivityStatusEnum.TO_START, ActivityStatusEnum.ACTIVE, ActivityStatusEnum.ON_HOLD, ActivityStatusEnum.ENDED, ActivityStatusEnum.CANCELED];
    }

    const type_activity = queryStringParameters.type_activity;
    if (!(type_activity in ActivityTypeEnum)) {
      throw new InvalidParameter("type_activity", type_activity);
    }

    const activities = await this.activity_repo.get_all_activities_by_status(statusAllowed, type_activity);
    return activities ? activities : [];
  }
}
