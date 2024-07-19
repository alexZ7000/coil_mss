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
import { time } from "console";

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

    let activity: Activity | null;
    let activity_update: Activity;
    let status_activity: ActivityStatusEnum = body.status_activity;

    if (!status_activity) {
      if (body.title && await this.activity_repo.check_activity_by_title(body.title)) {
        throw new UniqueConstraintError({
          message: "Activity with this title already exists"
        });
      }

      if (body.languages) {
        if (!Array.isArray(body.languages)) {
          throw new InvalidParameter("Languages", "must be an array of ids");
        }
        body.languages.forEach((language_id: number) => {
          if (!language_id) {
            throw new MissingParameter("Language ID");
          }
          if (typeof language_id !== 'number') {
            throw new InvalidParameter("Language ID", "must be a number");
          }
        })
      }

      if (body.courses) {
        if (!Array.isArray(body.courses)) {
          throw new InvalidParameter("Courses", "must be an array of ids");
        }
        body.courses.forEach((course_id: number) => {
          if (!course_id) {
            throw new MissingParameter("Course ID");
          }
          if (typeof course_id !== 'number') {
            throw new InvalidParameter("Course ID", "must be a number");
          }
        })
      }

      if (body.criterias) {
        if (!Array.isArray(body.criterias)) {
          throw new InvalidParameter("Criterias", "must be an array of criterias");
        }
        body.criterias.forEach((criteria: { id?: number, criteria?: string }) => {
          if (criteria.criteria && criteria.id) {
            throw new InvalidParameter("Criteria or Criteria ID", "You must provide only the criteria or the criteria id");
          }
          if (!criteria.criteria && !criteria.id) {
            throw new MissingParameter("Criteria or Criteria ID");
          }
          if (criteria.id && typeof criteria.id !== 'number') {
            throw new InvalidParameter("Criteria ID", "must be a number");
          }
          if (criteria.criteria && typeof criteria.criteria !== 'string') {
            throw new InvalidParameter("Criteria", "must be a string");
          }
        })
      }

      if (body.partner_institutions) {
        if (!Array.isArray(body.partner_institutions)) {
          throw new InvalidParameter("Partner Institutions", "must be an array of ids");
        }

        body.partner_institutions.forEach((institution: string) => {
          if (!institution) {
            throw new MissingParameter("Partner Institution");
          }
          if (typeof institution !== 'string') {
            throw new InvalidParameter("Partner Institution", "must be a string");
          }
        })
      }

      let languages: { id: number }[] = [];
      if (body.languages) {
        languages = body.languages.map((language_id: number) => {
          return {
            id: language_id
          }
        });
      }

      let courses: { id: number, course?: Course }[] = [];
      if (body.courses) {
        courses = body.courses.map((course_id: number) => {
          return {
            id: course_id
          }
        });
      }

      let criterias: { id: number, criteria?: Criteria }[] = [];
      if (body.criterias) {
        criterias = body.criterias.map((criteria: { id?: number, criteria?: string }) => {
          return {
            id: criteria.id || -1,
            criteria: criteria.criteria ? new Criteria({
              id: 1,
              criteria: criteria.criteria
            }) : null
          }
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

      let status_activity: ActivityStatusEnum = body.status_activity;
      if (status_activity) {
        if (!Object.values(ActivityStatusEnum).includes(body.status_activity)) {
          throw new InvalidParameter("Status Activity", "Invalid status activity");
        }
        if (![ActivityStatusEnum.ENDED, ActivityStatusEnum.CANCELED].includes(body.status_activity)) {
          throw new InvalidParameter("Status Activity", "Invalid status activity");
        }
      }


      activity = await this.activity_repo.get_activity(body.activity_id);
      if (!activity) {
        throw new NotfoundError("Activity not found");
      }

      if (body.start_date || body.end_date) {
        let time_now: Date = new Date();
        time_now.setHours(time_now.getHours() - 3);
        if (new Date(body.start_date) < time_now) {
          throw new InvalidParameter("StartDate", "Start Date must be in the future");
        }
        if (new Date(body.start_date) >= new Date(body.end_date)) {
          throw new InvalidParameter("StartDate and EndDate", "Start Date must be before End Date");
        }
      } else if (body.start_date && !body.end_date) {
        if (new Date(body.start_date) >= activity.end_date) {
          throw new InvalidParameter("StartDate", "Start Date must be before End Date");
        }
      } else if (!body.start_date && body.end_date) {
        if (activity.start_date >= new Date(body.end_date)) {
          throw new InvalidParameter("EndDate", "End Date must be after Start Date");
        }
      }
      activity_update = new Activity({
        id: activity.id,
        title: body.title ? body.title : activity.title,
        description: body.description ? body.description : activity.description,
        start_date: body.start_date ? new Date(body.start_date) : activity.start_date,
        end_date: body.end_date ? new Date(body.end_date) : activity.end_date,
        languages: languages.length > 0 ? languages : activity.languages,
        courses: courses.length > 0 ? courses : activity.courses,
        partner_institutions: partner_institutions.length > 0 ? partner_institutions : activity.partner_institutions,
        criterias: criterias.length > 0 ? criterias : activity.criterias,
        status_activity: activity.status_activity,
        type_activity: activity.type_activity,
        created_at: activity.created_at,
        updated_at: new Date(),
        applicants: activity.applicants
      });
    } else {
      activity = await this.activity_repo.get_activity(body.activity_id);
      if (!activity) {
        throw new NotfoundError("Activity not found");
      }
      if (![ActivityStatusEnum.ENDED, ActivityStatusEnum.CANCELED].includes(body.status_activity)) {
        throw new InvalidParameter("Status Activity", "Invalid status activity");
      }
      activity_update = new Activity({
        id: activity.id,
        title: activity.title,
        description: activity.description,
        start_date: activity.start_date,
        end_date: activity.end_date,
        languages: activity.languages,
        courses: activity.courses,
        partner_institutions: activity.partner_institutions,
        criterias: activity.criterias,
        status_activity: body.status_activity,
        type_activity: activity.type_activity,
        created_at: activity.created_at,
        updated_at: new Date(),
        applicants: activity.applicants
      });
    }

    await this.activity_repo.update_activity(activity_update).then(async (response) => {
      if (response && process.env.STAGE === "prod") {
        if (activity_update.start_date !== activity.start_date) {
          let start_date = activity_update.start_date;
          start_date.setHours(start_date.getHours() + 3);
          // Delete the previous trigger and create a new one
          await this.event_bridge.delete_trigger(
            "START_COIL_" + activity.id.substring(0, 8),
            "Update_Activity_Event"
          );
          await this.event_bridge.create_trigger(
            "START_COIL_" + activity.id.substring(0, 8),
            "Update_Activity_Event",
            start_date,
            {
              "body": {
                activity_id: activity.id,
                status_activity: ActivityStatusEnum.ACTIVE
              }
            }
          );
        }
        if (activity_update.end_date !== activity.end_date) {
          let end_date = activity_update.end_date;
          end_date.setHours(end_date.getHours() + 3);
          // Delete the previous trigger and create a new one
          await this.event_bridge.delete_trigger(
            "END_COIL_" + activity.id.substring(0, 8),
            "Update_Activity_Event"
          );
          await this.event_bridge.create_trigger(
            "END_COIL_" + activity.id.substring(0, 8),
            "Update_Activity_Event",
            end_date,
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
