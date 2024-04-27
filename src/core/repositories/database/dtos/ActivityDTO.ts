import { UserProps } from "./UserDTO";
import { InstitutionProps } from "./InstitutionDTO";
import { Course } from "../../../structure/entities/Course";
import { Activity } from "../../../structure/entities/Activity";
import { Criteria } from "../../../structure/entities/Criteria";
import { Institution } from "../../../structure/entities/Institution";
import { User } from "../../../structure/entities/User";


class ActivityProps {
    id: string;
    title: string;
    description: string;
    status_id: number;
    type_id: number;
    start_date: Date;
    end_date: Date;
    created_at: Date;
    updated_at: Date;
    languages: { id: number, activity_id: string, language: string }[] | [];
    courses: { id: number, activity_id: string, course: { id: number, name: string } }[] | [];
    criterias: { id?: number, activity_id: string, criteria: string }[] | [];
    partner_institutions: InstitutionProps[] | [];
    applications: { id?: number, activity_id: string, user: UserProps, status: number }[] | [];
}

export class ActivityDTO {
    public to_entity(activity: ActivityProps): Activity {
        return new Activity({
            id: activity.id,
            title: activity.title,
            description: activity.description,
            status_activity: activity.status_id,
            type_activity: activity.type_id,
            start_date: activity.start_date,
            end_date: activity.end_date,
            created_at: activity.created_at,
            updated_at: activity.updated_at,
            courses: activity.courses ? activity.courses.map(course => new Course({
                id: course.course.id,
                name: course.course.name
            })) : [],
            languages: activity.languages ? activity.languages.map(language => language.language) : [],
            criterias: activity.criterias ? activity.criterias.map(criteria =>
                new Criteria({
                    id: criteria.id,
                    criteria: criteria.criteria
                })) : [],
            partner_institutions: activity.partner_institutions ? activity.partner_institutions.map(institution => ({
                id: institution.institution.id,
                institution: institution.institution ? new Institution({
                    id: institution.institution.id,
                    name: institution.institution.name,
                    description: institution.institution.description,
                    email: institution.institution.email,
                    country: institution.institution.country,
                    images: institution.institution.images ? institution.institution.images.map(image => image.image) : [],
                    social_medias: institution.institution.social_medias ? institution.institution.social_medias.map(sm => ({
                        media: sm.media,
                        link: sm.link
                    })) : []
                }) : undefined
            })) : [],
            applicants: activity.applications ? activity.applications.map(application => ({
                id: application.user.id,
                status: application.status,
                user: application.user ? new User({
                    id: application.user.id,
                    name: application.user.name,
                    email: application.user.email,
                    user_type: application.user.user_type,
                    course: application.user.course,
                    semester_course: application.user.semester_course,
                    created_at: application.user.created_at,
                    updated_at: application.user.updated_at
                }) : undefined
            })) : []
        });
    }
}