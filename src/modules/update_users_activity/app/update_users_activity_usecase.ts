import {
  InvalidRequest,
  MissingParameter,
  NotfoundError,
  UserNotAllowed,
  UserNotAuthenticated,
  InvalidParameter,
  ConflictError
} from "../../../core/helpers/errors/ModuleError";
import { TokenAuth } from "../../../core/helpers/functions/token_auth";
import { UserTypeEnum } from "../../../core/helpers/enums/UserTypeEnum";
import { IUserRepo } from "../../../core/repositories/interfaces/IUserRepo";
import { EventBridgeManager } from "../../../core/helpers/functions/event_bridge";
import { IActivityRepo } from "../../../core/repositories/interfaces/IActivityRepo";
import { ActivityStatusEnum } from "../../../core/helpers/enums/ActivityStatusEnum";

export class UpdateUsersActivityUsecase {
  public token_auth: TokenAuth;
  public user_repo: IUserRepo;
  public activity_repo: IActivityRepo;
  public event_bridge: EventBridgeManager;

  constructor(user_repo: IUserRepo, actvity_repo: IActivityRepo) {
    this.token_auth = new TokenAuth();
    this.event_bridge = new EventBridgeManager();
    this.user_repo = user_repo;
    this.activity_repo = actvity_repo;
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
    if (!body.activity_id) {
      throw new MissingParameter("Activity ID");
    }
    if (!body.applicants) {
      throw new MissingParameter("Applicants");
    }
    if (!(Array.isArray(body.applicants))) {
      throw new InvalidParameter("Applicant ID", "must be an array");
    }
    if (body.applicants.length === 0) {
      throw new InvalidParameter("Applicant ID", "is required");
    }
    body.applicants.forEach((applicant_id: string) => {
      if (!applicant_id) {
        throw new InvalidParameter('Applicant ID', 'is required');
      }
      if (typeof applicant_id !== "string") {
        throw new InvalidParameter('Applicant ID', 'must be a string');
      }
    });

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
    let user_type_permission: UserTypeEnum[] = [UserTypeEnum.ADMIN, UserTypeEnum.MODERATOR];
    if (!user_type_permission.includes(user.user_type)) {
      throw new UserNotAllowed();
    }

    const activity = await this.activity_repo.get_activity(body.activity_id);
    if (!activity) {
      throw new NotfoundError("Activity not found");
    }

    if (activity.status_activity !== ActivityStatusEnum.ON_HOLD) {
      throw new UserNotAllowed("Activity is not on hold");
    }

    let applicants_db = await this.activity_repo.get_activity_applicants(body.activity_id, body.applicants);
    if (!applicants_db) {
      throw new NotfoundError("Applicants not found");
    }
    if (body.applicants.length !== applicants_db.length) {
      throw new NotfoundError("Applicants not found");
    }

    applicants_db.forEach((applicant: { user_id: string, status: boolean }) => {
      return {
        user_id: applicant.user_id,
        status: !applicant.status,
      };
    });

    const updateStatusResult = await this.activity_repo.update_users_activity_status(body.activity_id, body.applicants);
    if (!updateStatusResult) {
      throw new ConflictError("Error updating activity status");
    }

    return true;
  }
}