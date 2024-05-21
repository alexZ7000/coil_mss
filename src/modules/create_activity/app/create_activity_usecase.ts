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

    let time_now: Date = new Date();
    time_now.setHours(time_now.getHours() - 3);

    if (new Date(body.start_date) < time_now) {
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
    });

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
    });

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
    });

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
    });

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
        }) : undefined
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
      if (response && process.env.STAGE !== 'test') {
        let start_date = activity.start_date;
        start_date.setHours(start_date.getHours() + 3);
        let end_date = activity.end_date;
        end_date.setHours(end_date.getHours() + 3);
        await this.event_bridge.create_trigger(
          "START_ACTIVITY_" + activity.id,
          "Update_Activity_Event",
          start_date,
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
          end_date,
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
