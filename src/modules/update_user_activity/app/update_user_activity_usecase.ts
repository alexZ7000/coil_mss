import {
    InvalidParameter,
    InvalidRequest,
    MissingParameter,
    NotfoundError,
    UserNotAllowed,
    UserNotAuthenticated,
  
  } from "../../../core/helpers/errors/ModuleError";
  import { Activity } from "../../../core/structure/entities/Activity";
  import { TokenAuth } from "../../../core/helpers/functions/token_auth";
  import { UserTypeEnum } from "../../../core/helpers/enums/UserTypeEnum";
  import { IUserRepo } from "../../../core/repositories/interfaces/IUserRepo";
  import { EventBridgeManager } from "../../../core/helpers/functions/event_bridge";
  import { IActivityRepo } from "../../../core/repositories/interfaces/IActivityRepo";
  
  export class UpdateUserActivityUsecase {
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
      const applicantIndex = activity.applicants.findIndex(applicant => applicant.id === body.applicant.id);
        if (applicantIndex === -1) {
          throw new NotfoundError("Applicant not found");
        }

      const updateStatusResult = await this.activity_repo.update_user_activity_status(body.activity_id, body.applicant.id, body.applicant.status);

      if (!updateStatusResult) {
        throw new NotfoundError("Activity not found");
      }
    }
  }
