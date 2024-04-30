import { Op, UniqueConstraintError } from "sequelize";
import { ActivityDTO } from "../dtos/ActivityDTO";
import { User } from "../../../structure/entities/User";
import { IActivityRepo } from "../../interfaces/IActivityRepo";
import { Activity } from "../../../structure/entities/Activity";
import { ActivityStatusEnum } from "../../../helpers/enums/ActivityStatusEnum";
import { ActivityTypeEnum } from "../../../helpers/enums/ActivityTypeEnum";
import {
  Activity as ActivityDB,
  ActivityApplication,
  ActivityCourse,
  ActivityLanguage,
  ActivityCriteria,
  ActivityPartnerInstitution,
  ActivityStatus,
  ActivityType,
  User as UserDB,
  Institution,
  InstitutionImage as InstitutionImageDB,
  Course,
} from "../models/Models";

export class ActivityRepo implements IActivityRepo {
  private ActivityDTO: ActivityDTO;

  constructor() {
    this.ActivityDTO = new ActivityDTO();
  }

  async get_activity(id: string): Promise<Activity | null> {
    const activity = await ActivityDB.findOne({
      where: {
        id: id,
      },
      include: [
        { model: ActivityApplication, as: ActivityApplication.name },
        { model: ActivityCourse, as: ActivityCourse.name },
        { model: ActivityLanguage, as: ActivityLanguage.name },
        { model: ActivityCriteria, as: ActivityCriteria.name },
        {
          model: ActivityPartnerInstitution,
          as: ActivityPartnerInstitution.name,
        },
        { model: ActivityStatus, as: ActivityStatus.name },
        { model: ActivityType, as: ActivityType.name },
      ],
    });

    if (!activity) {
      return null;
    }

    return this.ActivityDTO.to_entity(activity.toJSON());
  }

  async get_activities_by_user_id(
    user_id: string,
    type: ActivityTypeEnum
  ): Promise<Activity[] | null> {
    const activities = await ActivityDB.findAll({
      include: [
        {
          model: ActivityCourse,
          as: 'courses',
          include: [{ model: Course, as: "course", attributes: ['name'] }],
          attributes: ['course_id']
        },
        { model: ActivityLanguage, as: 'languages', attributes: ['language'] },
        {
          model: ActivityPartnerInstitution,
          as: 'partner_institutions',
          include: [{
            model: Institution,
            as: 'institution',
            include: [{
              model: InstitutionImageDB,
              as: 'images',
              limit: 1,
              order: [['id', 'ASC']],
              attributes: ['image']
            }],
            attributes: ['name']
          }],
          attributes: ['institution_id']
        },
        {
          model: ActivityStatus,
          as: 'activity_status',
          where: { id: { [Op.notLike]: ActivityStatusEnum.CANCELED } },
        },
        { model: ActivityType, as: 'activity_type', where: { id: type } },
        { model: ActivityApplication, as: 'applications', where: { user_id: user_id } },
      ],
      order: [['start_date', 'ASC']],
    });

    if (!activities) {
      return null;
    }

    return activities.map((activity) =>
      activity.toJSON()
    );
  }

  async create_activity(activity: Activity): Promise<boolean> {
    await ActivityDB.create({
      id: activity.id,
      title: activity.title,
      description: activity.description,
      status_id: activity.status_activity,
      type_id: activity.type_activity,
      start_date: activity.start_date,
      end_date: activity.end_date,
      created_at: activity.created_at,
      updated_at: activity.updated_at,
    });

    await ActivityPartnerInstitution.bulkCreate(
      activity.partner_institutions.map((institution) => ({
        activity_id: activity.id,
        institution_id: institution.id,
      }))
    );

    await ActivityCourse.bulkCreate(
      activity.courses.map((course) => ({
        activity_id: activity.id,
        course_id: course.id,
      }))
    );

    await ActivityLanguage.bulkCreate(
      activity.languages.map((language) => ({
        activity_id: activity.id,
        language: language,
      }))
    );

    await ActivityCriteria.bulkCreate(
      activity.criterias.map((criteria) => ({
        activity_id: activity.id,
        criteria: criteria.criteria,
      }))
    );
    return true;
  }

  async check_activity_by_title(title: string): Promise<boolean> {
    const activity = await ActivityDB.findOne({
      where: {
        title: title,
      },
      attributes: ["id"],
    });

    if (!activity) {
      return false;
    }

    return true;
  }

  async get_all_activities_by_status(
    status: ActivityStatusEnum | ActivityStatusEnum[]
  ): Promise<Activity[]> {
    throw new Error("Method not implemented.");
  }

  async get_all_activities(): Promise<Activity[]> {
    throw new Error("Method not implemented.");
  }

  async get_users_assigned_to_activity(activity_id: string): Promise<User[]> {
    throw new Error("Method not implemented.");
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
    await ActivityDB.update(
      {
        title: activity.title,
        description: activity.description,
        status_id: activity.status_activity,
        type_id: activity.type_activity,
        start_date: activity.start_date,
        end_date: activity.end_date,
        updated_at: activity.updated_at,
      },
      {
        where: {
          id: activity.id,
        },
      }
    );

    await ActivityPartnerInstitution.destroy({
      where: {
        activity_id: activity.id,
      },
    });

    await ActivityCourse.destroy({
      where: {
        activity_id: activity.id,
      },
    });

    await ActivityLanguage.destroy({
      where: {
        activity_id: activity.id,
      },
    });

    await ActivityCriteria.destroy({
      where: {
        activity_id: activity.id,
      },
    });

    await ActivityPartnerInstitution.bulkCreate(
      activity.partner_institutions.map((institution) => ({
        activity_id: activity.id,
        institution_id: institution.id,
      }))
    );

    await ActivityCourse.bulkCreate(
      activity.courses.map((course) => ({
        activity_id: activity.id,
        course_id: course.id,
      }))
    );

    await ActivityLanguage.bulkCreate(
      activity.languages.map((language) => ({
        activity_id: activity.id,
        language: language,
      }))
    );

    await ActivityCriteria.bulkCreate(
      activity.criterias.map((criteria) => ({
        activity_id: activity.id,
        criteria: criteria.criteria,
      }))
    );
    return true;
  }

  async update_user_activity_status(
    activity_id: string,
    user_id: string,
    status: ActivityStatusEnum
  ): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  async update_activity_status(
    activity_id: string,
    status: ActivityStatusEnum
  ): Promise<boolean> {
    await ActivityDB.update(
      {
        status_id: status,
      },
      {
        where: {
          id: activity_id,
        },
      }
    );
    return true;
  }
}
