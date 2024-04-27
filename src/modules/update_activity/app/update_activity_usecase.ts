import {
  InvalidParameter,
  InvalidRequest,
  MissingParameter,
  NotfoundError,
  UserNotAllowed,
  UserNotAuthenticated,

} from "../../../core/helpers/errors/ModuleError";
import { UniqueConstraintError } from "sequelize";
import { Course } from "../../../core/structure/entities/Course";
import { Activity } from "../../../core/structure/entities/Activity";
import { Criteria } from "../../../core/structure/entities/Criteria";
import { TokenAuth } from "../../../core/helpers/functions/token_auth";
import { UserTypeEnum } from "../../../core/helpers/enums/UserTypeEnum";
import { IUserRepo } from "../../../core/repositories/interfaces/IUserRepo";
import { EventBridgeManager } from "../../../core/helpers/functions/event_bridge";
import { ActivityStatusEnum } from "../../../core/helpers/enums/ActivityStatusEnum";
import { IActivityRepo } from "../../../core/repositories/interfaces/IActivityRepo";

export class UpdateActivityUsecase {
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

    if (body.title && await this.activity_repo.check_activity_by_title(body.title)) {
      throw new UniqueConstraintError({
        message: "Activity with this title already exists"
      });
    }

    let courses: Course[] = [];
    if (body.courses) {
      courses = body.courses.map((course: { [key: string]: any }) => {
        return new Course({
          id: course.id,
          name: course.name
        });
      });
    }

    let criterias: Criteria[] = [];
    if (body.criterias) {
      criterias = body.criterias.map((criteria: string) => {
        return new Criteria({
          id: 0,
          criteria: criteria
        });
      });
    }

    let partner_institutions: { id: string }[] = [];
    if (body.partner_institutions) {
      partner_institutions = body.partner_institutions.map((institution: string) => {
        return {
          id: institution
        };
      });
    }

    const activity = await this.activity_repo.get_activity(body.activity_id);
    if (!activity) {
      throw new NotfoundError("Activity not found");
    }

    console.log(activity);

    if (body.start_date && body.end_date) {
      if (new Date(body.start_date) > new Date(body.end_date)) {
        throw new InvalidParameter("StartDate and EndDate", "Start Date must be before End Date");
      }
    } else if (body.start_date && !body.end_date) {
      if (new Date(body.start_date) > activity.end_date) {
        throw new InvalidParameter("StartDate", "Start Date must be before End Date");
      }
    } else if (!body.start_date && body.end_date) {
      if (activity.start_date > new Date(body.end_date)) {
        throw new InvalidParameter("EndDate", "End Date must be after Start Date");
      }
    }

    const activity_update: Activity = new Activity({
      id: activity.id,
      title: body.title ? body.title : activity.title,
      description: body.description ? body.description : activity.description,
      start_date: body.start_date ? new Date(body.start_date) : activity.start_date,
      end_date: body.end_date ? new Date(body.end_date) : activity.end_date,
      languages: body.languages ? body.languages : activity.languages,
      courses: courses ? courses : activity.courses,
      partner_institutions: partner_institutions ? partner_institutions : activity.partner_institutions,
      criterias: criterias ? criterias : activity.criterias,
      status_activity: body.status_activity ? body.status_activity : activity.status_activity,
      type_activity: body.type_activity ? body.type_activity : activity.type_activity,
      created_at: activity.created_at,
      updated_at: new Date(),
      applicants: activity.applicants
    });

    await this.activity_repo.update_activity(activity_update).then(async (response) => {
      if (response && process.env.STAGE === "prod") {
        if (activity_update.start_date !== activity.start_date) {
          // Delete the previous trigger and create a new one
          await this.event_bridge.delete_trigger(
            "START_ACTIVITY_" + activity.id,
            "Update_Activity_Event"
          );
          await this.event_bridge.create_trigger(
            "START_ACTIVITY_" + activity.id,
            "Update_Activity_Event",
            activity_update.start_date,
            {
              "body": {
                activity_id: activity.id,
                status_activity: ActivityStatusEnum.ACTIVE
              }
            }
          );
        }
        if (activity_update.end_date !== activity.end_date) {
          // Delete the previous trigger and create a new one
          await this.event_bridge.delete_trigger(
            "END_ACTIVITY_" + activity.id,
            "Update_Activity_Event"
          );
          await this.event_bridge.create_trigger(
            "END_ACTIVITY_" + activity.id,
            "Update_Activity_Event",
            activity_update.end_date,
            {
              "body": {
                activity_id: activity.id,
                status_activity: ActivityStatusEnum.ON_HOLD
              }
            }
          );
        }
      }
    });
  }
}
