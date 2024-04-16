import { UniqueConstraintError, } from "sequelize";
import { ActivityDTO } from "../dtos/ActivityDTO";
import { User } from "../../../structure/entities/User";
import { IActivityRepo } from "../../interfaces/IActivityRepo";
import { Activity } from "../../../structure/entities/Activity";
import { Unprocessable_Entity } from "../../../helpers/http/http_codes";
import { ActivityStatusEnum } from "../../../helpers/enums/ActivityStatusEnum";
import {
    Activity as ActivityDB, ActivityApplication, ActivityCourse, ActivityLanguage,
    ActivityCriteria, ActivityPartnerInstitution, ActivityStatus, ActivityType,
    Course, Institution, User as UserDB
} from "../models/Models";



export class ActivityRepo implements IActivityRepo {

    private ActivityDTO: ActivityDTO;

    constructor() {
        this.ActivityDTO = new ActivityDTO();
    }

    async get_activity(id: string): Promise<Activity | null> {
        const activity = await ActivityDB.findOne({
            where: {
                id: id
            },
            include: [
                { model: ActivityApplication, as: ActivityApplication.name },
                { model: ActivityCourse, as: ActivityCourse.name },
                { model: ActivityLanguage, as: ActivityLanguage.name },
                { model: ActivityCriteria, as: ActivityCriteria.name },
                { model: ActivityPartnerInstitution, as: ActivityPartnerInstitution.name },
                { model: ActivityStatus, as: ActivityStatus.name },
                { model: ActivityType, as: ActivityType.name }
            ]
        });

        if (!activity) {
            return null;
        }

        return this.ActivityDTO.to_entity(activity.toJSON());
    }

    async create_activity(activity: Activity): Promise<boolean> {
        try {
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

            await ActivityPartnerInstitution.bulkCreate(activity.partner_institutions.map(institution => ({
                activity_id: activity.id,
                institution_id: institution.id
            })));

            await ActivityCourse.bulkCreate(activity.courses.map(course => ({
                activity_id: activity.id,
                course_id: course.id
            })));

            await ActivityLanguage.bulkCreate(activity.languages.map(language => ({
                activity_id: activity.id,
                language: language
            })));

            await ActivityCriteria.bulkCreate(activity.criterias.map(criteria => ({
                activity_id: activity.id,
                criteria: criteria.criteria
            })));
        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                throw new Unprocessable_Entity("Activity already exists");
            }
            throw error;
        }
        return true;
    }

    async check_activity_by_title(title: string): Promise<boolean> {
        const activity = await ActivityDB.findOne({
            where: {
                title: title
            },
            attributes: ['id']
        });

        if (!activity) {
            return false;
        }

        return true;
    }

    async get_all_activities_by_status(status: ActivityStatusEnum | ActivityStatusEnum[]): Promise<Activity[]> {
        throw new Error("Method not implemented.");
    }

    async get_all_activities(): Promise<Activity[]> {
        throw new Error("Method not implemented.");
    }

    async get_users_assigned_to_activity(activity_id: string): Promise<User[]> {
        throw new Error("Method not implemented.");
    }

    async assign_user_to_activity(activity_id: string, user_id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async remove_user_from_activity(activity_id: string, user_id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async update_activity(activity: Activity): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async get_activities_by_user_id(user_id: string, type: ActivityStatusEnum): Promise<Activity[] | null> {
        throw new Error("Method not implemented.");
    }

    async update_user_activity_status(activity_id: string, user_id: string, status: ActivityStatusEnum): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}