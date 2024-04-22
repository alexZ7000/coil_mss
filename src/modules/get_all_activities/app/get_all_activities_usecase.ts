import { ActivityStatusEnum } from "../../../core/helpers/enums/ActivityStatusEnum";
import { UserTypeEnum } from "../../../core/helpers/enums/UserTypeEnum";
import { ActivityTypeEnum } from "../../../core/helpers/enums/ActivityTypeEnum"; // Import do enum ActivityTypeEnum
import { IActivityRepo } from "../../../core/repositories/interfaces/IActivityRepo";
import { IUserRepo } from "../../../core/repositories/interfaces/IUserRepo";
import { InvalidRequest, MissingParameter, UserNotAuthenticated } from "../../../core/helpers/errors/ModuleError";
import { TokenAuth } from "../../../core/helpers/functions/token_auth";
import { OK, BadRequest, Unauthorized, ParameterError, InternalServerError } from "../../../core/helpers/http/http_codes";

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
    } else if (user.user_type === UserTypeEnum.ADMIN || user.user_type === UserTypeEnum.MODERATOR) {
      statusAllowed = [ActivityStatusEnum.TO_START, ActivityStatusEnum.ACTIVE, ActivityStatusEnum.ON_HOLD, ActivityStatusEnum.ENDED, ActivityStatusEnum.CANCELED];
    } else {
      throw new Unauthorized("User not authorized");
    }

    const type = queryStringParameters?.type || null;
    let statuses: ActivityStatusEnum[] = [];

    if (typeof type === "string") {
      const typeNumber = parseInt(type, 10);
      if (isNaN(typeNumber)) {
        throw new BadRequest("Invalid activity type parameter");
      }
      if (typeNumber < 1 || typeNumber > 2) {
        throw new BadRequest("Invalid activity type");
      }

      if (typeNumber === ActivityTypeEnum.PROJECT) {
        statuses = statusAllowed;
      } else if (typeNumber === ActivityTypeEnum.ACADEMIC_MOBILITY) {
        statuses = statusAllowed.filter(status => status >= 3);
      }
    } else {
      statuses = statusAllowed;
    }

    const activities = await this.activity_repo.get_all_activities_by_status(statuses, type);
    return activities ? activities.map(activity => activity.to_json()) : [];
  }
}
