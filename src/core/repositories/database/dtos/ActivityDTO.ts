import { UserProps } from "./UserDTO";
import { InstitutionProps } from "./InstitutionDTO";
import { Course } from "../../../structure/entities/Course";
import { Activity } from "../../../structure/entities/Activity";
import { Criteria } from "../../../structure/entities/Criteria";
import { Institution } from "../../../structure/entities/Institution";


class ActivityProps {
    id: string;
    title: string;
    description: string;
    activity_status: number;
    activity_type: number;
    start_date: Date;
    end_date: Date;
    created_at: Date;
    updated_at: Date;
    languages: { id?: number, activity_id: string, language: string }[] | [];
    criterias: { id?: number, activity_id: string, criteria: string }[] | [];
    partner_institutions: InstitutionProps[] | [];
    courses: { id?: number, activity_id: string, course: { id: number, name: string } }[] | [];
    applications: { id?: number, activity_id: string, user: UserProps, status: number }[] | [];
}

export class ActivityDTO {
    public to_entity(activity: ActivityProps): Activity {
        return new Activity({
            id: activity.id,
            title: activity.title,
            description: activity.description,
            status_activity: activity.activity_status,
            type_activity: activity.activity_type,
            start_date: activity.start_date,
            end_date: activity.end_date,
            created_at: activity.created_at,
            updated_at: activity.updated_at,
            languages: activity.languages ? activity.languages.map(language => language.language) : [],
            criterias: activity.criterias ? activity.criterias.map(criteria =>
                new Criteria({
                    id: criteria.id,
                    criteria: criteria.criteria
                })) : [],
            partner_institutions: activity.partner_institutions ? activity.partner_institutions.map(institution =>
                new Institution({
                    id: institution.id,
                    name: institution.name,
                    description: institution.description,
                    email: institution.email,
                    country: institution.country,
                    images: institution.images ? institution.images.map(image => image.image) : [],
                    social_medias: institution.social_medias ? institution.social_medias.map(sm => ({
                        media: sm.media,
                        link: sm.link
                    })) : []
                })) : [],
            courses: activity.courses ? activity.courses.map(course => new Course({
                id: course.course.id,
                name: course.course.name
            })) : [],
            applicants: activity.applications ? activity.applications.map(application => ({
                id: application.user.id,
                status: application.status
            })) : []
        });
    }
}