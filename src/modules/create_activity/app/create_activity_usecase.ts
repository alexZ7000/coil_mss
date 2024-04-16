import { randomUUID } from "crypto";

import {
  InvalidRequest,
  MissingParameter,
  UserNotAuthenticated,
} from "../../../core/helpers/errors/ModuleError";

import { Course } from "../../../core/structure/entities/Course";
import { Activity } from "../../../core/structure/entities/Activity";
import { Criteria } from "../../../core/structure/entities/Criteria";
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
    if (!(user.user_type in user_types_allowed)) {
      throw new UserNotAuthenticated();
    }

    const courses = body.courses.map((course: { [key: string]: any }) => {
      return new Course({
        id: course.id,
        name: course.name
      });
    });

    const criterias = body.criterias.map((criteria: { [key: string]: any }) => {
      return new Criteria({
        id: 0,
        criteria: criteria.criteria
      });
    });

    const partner_institutions = body.partner_institutions.map(
      (institution: string) => {
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
      languages: body.languages,
      partner_institutions: partner_institutions,
      courses: courses,
      criterias: criterias,
      applicants: [],
      status_activity: ActivityStatusEnum.TO_START,
      type_activity: body.type_activity,
      created_at: new Date(),
      updated_at: new Date()
    });

    await this.activity_repo.create_activity(activity);

    this.event_bridge.create_trigger(
      "START_ACTIVITY_" + activity.id,
      "Start_Activity", 
      activity.start_date,
      {
        activity_id: activity.id
      }
    );

    this.event_bridge.create_trigger(
      "END_ACTIVITY_" + activity.id,
      "End_Activity",
      activity.end_date,
      {
        activity_id: activity.id
      }
    );
    
  }
}
