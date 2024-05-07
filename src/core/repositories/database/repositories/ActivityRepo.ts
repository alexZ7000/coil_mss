import { ActivityDTO } from "../dtos/ActivityDTO";
import { User } from "../../../structure/entities/User";
import { IActivityRepo } from "../../interfaces/IActivityRepo";
import { Activity } from "../../../structure/entities/Activity";
import { ActivityStatusEnum } from "../../../helpers/enums/ActivityStatusEnum";
import {
  Activity as ActivityDB,
  ActivityApplication,
  ActivityCourse,
  ActivityLanguage,
  ActivityCriteria,
  ActivityPartnerInstitution,
  ActivityStatus,
  ActivityType,
  Course,
  Institution,
  User as UserDB,
} from "../models/Models";

export class ActivityRepo implements IActivityRepo {
  async get_activity(id: string): Promise<Activity | null> {
    throw new Error("Method not implemented.");
  }

  async create_activity(activity: Activity): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  async get_activity_by_title(title: string): Promise<Activity | null> {
    throw new Error("Method not implemented.");
  }

  async get_all_activities_by_status(
    status: ActivityStatusEnum | ActivityStatusEnum[]
  ): Promise<Activity[]> {
    const activities = await ActivityDB.findAll({
      where: {
        status_activity: status,
      },
    });

    return activities.map((activity: any) => new Activity(activity));
  }

  async get_all_activities(): Promise<Activity[]> {
    const activities = await ActivityDB.findAll({
      include: [
        {
          model: ActivityCourse,
          as: "courses",
          include: [Course],
        },
        {
          model: ActivityLanguage,
          as: "languages",
        },
        {
          model: ActivityCriteria,
          as: "criterias",
        },
        {
          model: ActivityPartnerInstitution,
          as: "partner_institutions",
          include: [Institution],
        },
        {
          model: ActivityStatus,
          as: "status_activity",
        },
        {
          model: ActivityType,
          as: "type_activity",
        },
        {
          model: UserDB,
          as: "applicants",
        },
      ],
    });

    return activities.map((activity: any) => new Activity(activity));
  }

  async get_users_assigned_to_activity(activity_id: string): Promise<User[]> {
    const users = await ActivityApplication.findAll({
      where: {
        activity_id: activity_id,
      },
    });

    return users.map((user: any) => new User(user));
  }

  async assign_user_to_activity(
    activity_id: string,
    user_id: string
  ): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  async remove_user_from_activity(
    activity_id: string,
    user_id: string
  ): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  async update_activity(activity: Activity): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  async get_activities_by_user_id(user_id: string): Promise<Activity[] | null> {
    const activities = await ActivityApplication.findAll({
      where: {
        user_id: user_id,
      },
    });
    return activities.map((activity: any) => new Activity(activity));
  }

  async check_activity_enrolled_by_user(
    user_id: string,
    activity_id: string
  ): Promise<boolean> {
    const activity = await ActivityApplication.findOne({
      where: {
        activity_id: activity_id,
        user_id: user_id,
      },
    });
    return activity ? true : false;
  }

  async update_user_activity_status(
    activity_id: string,
    user_id: string,
    status: ActivityStatusEnum
  ): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
