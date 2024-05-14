import { randomUUID } from "crypto";
import { UniqueConstraintError } from "sequelize";
import {
  UserNotAllowed,
  InvalidRequest,
  MissingParameter,
  UserNotAuthenticated,
  InvalidParameter,
} from "../../../core/helpers/errors/ModuleError";
import { Criteria } from "../../../core/structure/entities/Criteria";
import { Activity } from "../../../core/structure/entities/Activity";
import { TokenAuth } from "../../../core/helpers/functions/token_auth";
import { UserTypeEnum } from "../../../core/helpers/enums/UserTypeEnum";
import { IUserRepo } from "../../../core/repositories/interfaces/IUserRepo";
import { EventBridgeManager } from "../../../core/helpers/functions/event_bridge";
import { ActivityStatusEnum } from "../../../core/helpers/enums/ActivityStatusEnum";
import { IActivityRepo } from "../../../core/repositories/interfaces/IActivityRepo";


export class CreateActivityUsecase {
  private token_auth: TokenAuth;
  private user_repo: IUserRepo;
  private activity_repo: IActivityRepo;
  private event_bridge: EventBridgeManager;

  constructor(
    user_repo: IUserRepo,
    activity_repo: IActivityRepo
  ) {
    this.token_auth = new TokenAuth();
    this.event_bridge = new EventBridgeManager();
    this.user_repo = user_repo;
    this.activity_repo = activity_repo;
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
    if (!body.title) {
      throw new MissingParameter("Title");
    }
    if (!body.description) {
      throw new MissingParameter("Description");
    }
    if (!body.start_date) {
      throw new MissingParameter("Start Date");
    }
    if (!body.end_date) {
      throw new MissingParameter("End Date");
    }
    if (!body.languages) {
      throw new MissingParameter("Languages");
    }
    if (!body.partner_institutions) {
      throw new MissingParameter("Partner Institutions");
    }
    if (!body.courses) {
      throw new MissingParameter("Courses");
    }
    if (!body.criterias) {
      throw new MissingParameter("Criterias");
    }
    if (!body.type_activity) {
      throw new MissingParameter("Type Activity");
    }
    if (new Date(body.start_date) < new Date()) {
      throw new InvalidParameter("StartDate", "Start Date must be in the future");
    }
    if (new Date(body.start_date) >= new Date(body.end_date)) {
      throw new InvalidParameter("StartDate and EndDate", "StartDate must be before EndDate");
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
    const user_types_allowed = [UserTypeEnum.ADMIN, UserTypeEnum.MODERATOR];
    if (!user_types_allowed.includes(user.user_type)) {
      throw new UserNotAllowed();
    }

    if (await this.activity_repo.check_activity_by_title(body.title)) {
      throw new UniqueConstraintError({
        message: "Activity with this title already exists"
      });
    }

    const languages = body.languages.map((language_id: number) => {
      return {
        id: language_id
      }
    });

    const courses = body.courses.map((course_id: number) => {
      return {
        id: course_id
      }
    });

    const criterias = body.criterias.map((criteria: { id?: number, criteria?: string }) => {
      return {
        id: criteria.id || -1,
        criteria: criteria.criteria ? new Criteria({
          id: 1,
          criteria: criteria.criteria
        }) : null
      }
    });

    const partner_institutions = body.partner_institutions.map((institution: string) => {
      return {
        id: institution
      };
    }
    );

    const activity = new Activity({
      id: randomUUID(),
      title: body.title,
      description: body.description,
      start_date: new Date(body.start_date),
      end_date: new Date(body.end_date),
      languages: languages,
      partner_institutions: partner_institutions,
      courses: courses,
      criterias: criterias,
      applicants: [],
      status_activity: ActivityStatusEnum.TO_START,
      type_activity: body.type_activity,
      created_at: new Date(),
      updated_at: new Date()
    });

    await this.activity_repo.create_activity(activity).then(async (response) => {
      if (response && process.env.STAGE === "prod") {
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
    });

    return { id: activity.id };
  }
}
