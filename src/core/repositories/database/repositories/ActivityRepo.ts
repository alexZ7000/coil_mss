import { Includeable, Op } from "sequelize";
import { ActivityDTO } from "../dtos/ActivityDTO";
import { IActivityRepo } from "../../interfaces/IActivityRepo";
import { Activity } from "../../../structure/entities/Activity";
import { ActivityTypeEnum } from "../../../helpers/enums/ActivityTypeEnum";
import { ActivityStatusEnum } from "../../../helpers/enums/ActivityStatusEnum";
import {
    Course,
    Institution,
    ActivityType,
    ActivityStatus,
    ActivityCourse,
    User as UserDB,
    ActivityCriteria,
    ActivityLanguage,
    ActivityApplication,
    Activity as ActivityDB,
    ActivityPartnerInstitution,
    InstitutionImage as InstitutionImageDB,
    InstitutionSocialMedia as InstitutionSocialMediaDB,
    InstitutionCountry,
    UserType,
    Language,
    Criteria,
    Country,
    SocialMedia
} from "../models/Models";
import { a } from "vitest/dist/suite-IbNSsUWN";


export class ActivityRepo implements IActivityRepo {

    private ActivityDTO: ActivityDTO;

    constructor() {
        this.ActivityDTO = new ActivityDTO();
    }

    async get_activity(id: string, applicants?: boolean): Promise<Activity | null> {
        let include: Includeable | Includeable[] = [
            {
                model: ActivityCourse,
                as: 'courses',
                include: [{ model: Course, as: 'course' }],
                attributes: ['course_id']
            },
            { model: ActivityLanguage, as: 'languages', attributes: ['language_id'], include: [{ model: Language, as: 'language' }] },
            { model: ActivityCriteria, as: 'criterias', attributes: ['criteria_id'], include: [{ model: Criteria, as: 'criteria' }] },
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
                    }, {
                        model: InstitutionSocialMediaDB,
                        as: 'social_medias',
                        include: [{ model: SocialMedia, as: 'media' }]
                    }, {
                        model: InstitutionCountry,
                        as: 'countries',
                        include: [{ model: Country, as: 'country' }]
                    }]
                }],
                attributes: ['institution_id'],
            },
            { model: ActivityStatus, as: 'activity_status' },
            { model: ActivityType, as: 'activity_type' }
        ];

        if (applicants) {
            include.push({
                model: ActivityApplication, as: 'applications', include: [{
                    model: UserDB, as: 'user', include: [{ model: UserType, as: 'user_type' }]
                }],
                attributes: ['id', 'user_id', 'status'],
                order: [['created_at', 'ASC']]
            });
        }

        const activity = await ActivityDB.findOne({
            where: {
                id: id
            },
            include: include
        });

        if (!activity) {
            return null;
        }

        return this.ActivityDTO.to_entity(activity.toJSON());
    }

    async check_activity_enrolled_by_user(user_id: string, activity_id: string): Promise<boolean> {
        const activity = await ActivityApplication.findOne({
            where: {
                user_id: user_id,
                activity_id: activity_id
            }
        });

        return activity ? true : false;
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
                    include: [{ model: Course, as: "course" }],
                    attributes: ['course_id']
                },
                { model: ActivityLanguage, as: 'languages', attributes: ['language_id'], include: [{ model: Language, as: 'language' }] },
                { model: ActivityCriteria, as: 'criterias', attributes: ['criteria_id'], include: [{ model: Criteria, as: 'criteria' }] },
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
                        },
                        {
                            model: InstitutionCountry,
                            as: 'countries',
                            include: [{ model: Country, as: 'country' }]
                        }]
                    }],
                    attributes: ['institution_id'],
                },
                {
                    model: ActivityStatus,
                    as: 'activity_status',
                    where: { id: { [Op.notLike]: ActivityStatusEnum.CANCELED } },
                },
                { model: ActivityType, as: 'activity_type', where: { id: type } },
                { model: ActivityApplication, as: 'applications', where: { user_id: user_id }, attributes: ['id', 'status'] },
            ],
            order: [['start_date', 'ASC']],
        });

        if (!activities) {
            return null;
        }

        return activities.map((activity) => this.ActivityDTO.to_entity(activity.toJSON()));
    }

    async get_activity_applicant(activity_id: string, user_id: string): Promise<{ user_id: string, status: boolean } | null> {
        const applicant = await ActivityApplication.findOne({
            where: {
                activity_id: activity_id,
                user_id: user_id
            }
        }).then(applicant => applicant?.toJSON())
            .catch(err => null);

        if (!applicant) {
            return null;
        }

        return {
            user_id: applicant.user_id,
            status: applicant.status
        };
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
            language_id: language.id
        })));

        let new_criterias = await Criteria.bulkCreate(activity.criterias.filter(criteria => criteria.id == -1).map(criteria => ({
            criteria: criteria.criteria?.criteria
        }), { returning: true, ignoreDuplicates: true }));

        await ActivityCriteria.bulkCreate(new_criterias.map(criteria => ({
            activity_id: activity.id,
            criteria_id: criteria.toJSON().id
        })));

        await ActivityCriteria.bulkCreate(activity.criterias.filter(criteria => criteria.id != -1).map(criteria => ({
            activity_id: activity.id,
            criteria_id: criteria.id
        })));

        return true;
    }

    async check_activity_by_id(id: string): Promise<boolean> {
        const activity = await ActivityDB.findOne({
            where: {
                id: id
            },
            attributes: ['id']
        });

        if (!activity) {
            return false;
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

    async get_all_activities_by_status(status: ActivityStatusEnum | ActivityStatusEnum[], type: ActivityTypeEnum): Promise<Activity[]> {
        const statuses = Array.isArray(status) ? status : [status];
        const activities = await ActivityDB.findAll({
            where: {
                status_id: statuses
            },
            attributes: { exclude: ['description', "status_id", "type_id"] },
            include: [
                {
                    model: ActivityCourse,
                    as: 'courses',
                    include: [{ model: Course, as: 'course' }],
                    attributes: ['course_id']
                },
                { model: ActivityLanguage, as: 'languages', attributes: ['language_id'], include: [{ model: Language, as: 'language' }] },
                { model: ActivityCriteria, as: 'criterias', attributes: ['criteria_id'], include: [{ model: Criteria, as: 'criteria' }] },
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
                        }, {
                            model: InstitutionSocialMediaDB,
                            as: 'social_medias',
                            include: [{ model: SocialMedia, as: 'media' }]
                        }, {
                            model: InstitutionCountry,
                            as: 'countries',
                            include: [{ model: Country, as: 'country' }]
                        }],
                    }],
                    attributes: ['institution_id'],
                },
                { model: ActivityStatus, as: 'activity_status' },
                { model: ActivityType, as: 'activity_type', where: { id: type } }
            ],
            order: [
                ['start_date', 'ASC']
            ]
        });

        return activities.map(activity => activity.toJSON());
    }

    async assign_user_to_activity(activity_id: string, user_id: string): Promise<{ assign: boolean }> {
        const applicated = await ActivityApplication.findOne({
            where: {
                activity_id: activity_id,
                user_id: user_id
            }
        });

        if (applicated) {
            await ActivityApplication.destroy({
                where: {
                    activity_id: activity_id,
                    user_id: user_id
                }
            });
            return { assign: false };
        }

        await ActivityApplication.create({
            activity_id: activity_id,
            user_id: user_id,
            status: false,
            created_at: new Date(),
            updated_at: new Date()
        });
        return { assign: true };
    }

    async remove_user_from_activity(activity_id: string, user_id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async update_activity(activity: Activity): Promise<boolean> {
        await ActivityDB.update({
            title: activity.title,
            description: activity.description,
            status_id: activity.status_activity,
            type_id: activity.type_activity,
            start_date: activity.start_date,
            end_date: activity.end_date,
            updated_at: activity.updated_at,
        }, {
            where: {
                id: activity.id
            }
        });

        await ActivityPartnerInstitution.destroy({
            where: {
                activity_id: activity.id
            }
        });

        await ActivityCourse.destroy({
            where: {
                activity_id: activity.id
            }
        });

        await ActivityLanguage.destroy({
            where: {
                activity_id: activity.id
            }
        });

        await ActivityCriteria.destroy({
            where: {
                activity_id: activity.id
            }
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

        let new_criterias = await Criteria.bulkCreate(activity.criterias.filter(criteria => criteria.id == -1).map(criteria => ({
            name: criteria.criteria?.criteria
        }), { returning: true, ignoreDuplicates: true }));

        await ActivityCriteria.bulkCreate(new_criterias.map(criteria => ({
            activity_id: activity.id,
            criteria_id: criteria.toJSON().id
        })));

        await ActivityCriteria.bulkCreate(activity.criterias.filter(criteria => criteria.id != -1).map(criteria => ({
            activity_id: activity.id,
            criteria_id: criteria.id
        })));

        return true;
    }

    async get_activity_applicants(activity_id: string, applicants: string[]): Promise<{ user_id: string, status: boolean }[]> {
        const activity_applicants = await ActivityApplication.findAll({
            where: {
                activity_id: activity_id,
                user_id: applicants
            },
            attributes: ['user_id', 'status']
        });

        return activity_applicants.map(applicant => applicant.toJSON());
    }

    async update_activity_status(activity_id: string, status: ActivityStatusEnum): Promise<boolean> {
        const response = await ActivityDB.update({
            status_id: status
        }, {
            where: {
                id: activity_id
            }
        });
        if (response[0] === 0) {
            return false;
        }
        return true;
    }

    async update_users_activity_status(activity_id: string, users: { user_id: string, status: boolean }[]): Promise<boolean> {
        for (let user of users) {
            const response = await ActivityApplication.update({
                status: user.status
            }, {
                where: {
                    activity_id: activity_id,
                    user_id: user.user_id
                }
            });
            if (response[0] === 0) {
                return false;
            }
        }
        return true;
    }

    async get_all_activities_catalog(): Promise<{ title: string; logo: string; type_activity: ActivityTypeEnum; }[]> {
        const response_project = await ActivityDB.findAll({
            include: [{
                model: ActivityPartnerInstitution, as: 'partner_institutions',
                include: [{
                    model: Institution,
                    as: 'institution',
                    include: [{
                        model: InstitutionImageDB, as: 'images',
                        limit: 1,
                        order: [['id', 'ASC']]
                    }]
                }]
            }],
            where: {
                status_id: {
                    [Op.or]: [ActivityStatusEnum.ACTIVE, ActivityStatusEnum.TO_START]
                },
                type_id: ActivityTypeEnum.PROJECT
            },
            order: [
                ['start_date', 'ASC']
            ],
            limit: 5
        });

        const response_mobility = await ActivityDB.findAll({
            include: [{
                model: ActivityPartnerInstitution, as: 'partner_institutions',
                include: [{
                    model: Institution,
                    as: 'institution',
                    include: [{
                        model: InstitutionImageDB, as: 'images',
                        limit: 1,
                        order: [['id', 'ASC']]
                    }]
                }]
            }],
            where: {
                status_id: {
                    [Op.or]: [ActivityStatusEnum.ACTIVE, ActivityStatusEnum.TO_START]
                },
                type_id: ActivityTypeEnum.ACADEMIC_MOBILITY
            },
            order: [
                ['start_date', 'ASC']
            ],
            limit: 5
        });

        let activities = response_project.concat(response_mobility);

        let activities_json: {
            title: string;
            partner_institutions: {
                institution: {
                    images: { image: string }[];
                };
            }[];
            type_id: ActivityTypeEnum;
        }[] = activities.map(activity => activity.toJSON());

        activities_json = activities_json.map(activity => (
            activity = activity.partner_institutions.length > 0 ? activity : { ...activity, partner_institutions: [{ institution: { images: [{ image: "" }] } }] }
        ));

        return activities_json.map(activity => ({
            title: activity.title,
            logo: activity.partner_institutions[0].institution.images[0].image,
            type_activity: activity.type_id
        }));
    }
}