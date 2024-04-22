import {
  InvalidRequest,
  MissingParameter,
  NotfoundError,
  UserNotAllowed,
  UserNotAuthenticated,
} from "../../../core/helpers/errors/ModuleError";
import { UniqueConstraintError } from "sequelize";
import { Course } from "../../../core/structure/entities/Course";
import { Criteria } from "../../../core/structure/entities/Criteria";
import { TokenAuth } from "../../../core/helpers/functions/token_auth";
import { IUserRepo } from "../../../core/repositories/interfaces/IUserRepo";
import { ActivityTypeEnum } from "../../../core/helpers/enums/ActivityTypeEnum";
import { EventBridgeManager } from "../../../core/helpers/functions/event_bridge";
import { ActivityStatusEnum } from "../../../core/helpers/enums/ActivityStatusEnum";
import { IActivityRepo } from "../../../core/repositories/interfaces/IActivityRepo";
import { UserTypeEnum } from "../../../core/helpers/enums/UserTypeEnum";

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
    if (body.title && await this.activity_repo.check_activity_by_title(body.title)) {
      throw new UniqueConstraintError({
        message: "Activity with this title already exists"
      });
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
    if (user.user_type === UserTypeEnum.STUDENT) {
      throw new UserNotAllowed()
    }

    const courses = body.courses.map((course: { [key: string]: any }) => {
      return new Course({
        id: course.id,
        name: course.name
      });
    });

    const criterias = body.criterias.map((criteria: string) => {
      return new Criteria({
        id: 0,
        criteria: criteria
      });
    });

    const partner_institutions = body.partner_institutions.map(
      (institution: string) => {
        return {
          id: institution
        };
      }
    );

    const activity = await this.activity_repo.get_activity(body.id);
    if (!activity) {
      throw new NotfoundError("Activity not found");
    }

    activity.update({
      id: body.id as string,
      title: body.title as string,
      description: body.description as string,
      type_activity: body.type_activity as ActivityTypeEnum,
      status_activity: body.status_activity as ActivityStatusEnum,
      start_date: body.start_date as Date,
      end_date: body.end_date as Date,
      languages: body.languages as string[],
      partner_institutions: partner_institutions as { id: string; name?: string }[],
      criterias: criterias as Criteria[],
      courses: courses as Course[],
      applicants: activity.applicants,
      created_at: activity.created_at as Date,
      updated_at: new Date()
    });

    await this.activity_repo.update_activity(activity).then(async (response) => {
      if (response) {
        if (body.end_date !== activity.end_date) {
          // Delete the previous trigger and create a new one
          await this.event_bridge.delete_trigger(
            "START_ACTIVITY_" + activity.id,
            "Update_Activity_Event"
          )
          await this.event_bridge.delete_trigger(
            "START_ACTIVITY_" + activity.id,
            "Update_Activity_Event"
          );
          await this.event_bridge.create_trigger(
            "START_ACTIVITY_" + activity.id,
            "Update_Activity_Event",
            activity.start_date,
            {
              "body": {
                activity_id: activity.id,
                status_activity: ActivityStatusEnum.ACTIVE
              }
            }
          );
          await this.event_bridge.create_trigger(
            "END_ACTIVITY_" + activity.id,
            "Update_Activity_Event",
            activity.end_date,
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

    return activity;
  }
}
