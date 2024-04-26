import { ActivityStatusEnum } from "../../../core/helpers/enums/ActivityStatusEnum";
import { ActivityTypeEnum } from "../../../core/helpers/enums/ActivityTypeEnum";
import { UserTypeEnum } from "../../../core/helpers/enums/UserTypeEnum";
import {
  InvalidRequest,
  MissingParameter,
  UserNotAuthenticated,
} from "../../../core/helpers/errors/ModuleError";
import { TokenAuth } from "../../../core/helpers/functions/token_auth";
import { NotFound } from "../../../core/helpers/http/http_codes";
import { NotFoundError } from "../../../core/helpers/errors/RepoError";
import { IActivityRepo } from "../../../core/repositories/interfaces/IActivityRepo";
import { IUserRepo } from "../../../core/repositories/interfaces/IUserRepo";

export class GetActivityUsecase {
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
      throw new InvalidRequest("Body");
    }
    if (!queryStringParameters.activity_id) {
      throw new MissingParameter("activity_id");
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

    const activity = await this.activity_repo.get_activity(
      queryStringParameters.activity_id
    );
    if (!activity) {
      throw new NotFoundError("Activity not found");
    }

    if (user.user_type === UserTypeEnum.STUDENT) {
      const check_user_enrolled =
        await this.activity_repo.check_activity_enrolled_by_user(
          user_id,
          activity.id
        );
      const condition =
        ActivityStatusEnum.CANCELED === activity.status_activity ||
        (!check_user_enrolled &&
          [ActivityStatusEnum.ON_HOLD, ActivityStatusEnum.ENDED].includes(
            activity.status_activity
          ));
      if (condition) {
        throw new NotFound("Activity not found");
      }
    }

    const enrolled_users = await this.activity_repo.get_users_assigned_to_activity(
      activity.id
    );

    return {
      activity: activity.to_json(),
      enrolled_users: enrolled_users.map((user) => user.to_json()),
    };
  }
}
