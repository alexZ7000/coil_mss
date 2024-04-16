import { Course } from "../../../structure/entities/Course";
import { Activity } from "../../../structure/entities/Activity";
import { Criteria } from "../../../structure/entities/Criteria";
import { Institution } from "../../../structure/entities/Institution";


class ActivityProps {
    id: string;
    title: string;
    description: string;
    ActivityStatus: {id: number, name: string};
    ActivityType: {id: number, name: string};
    start_date: Date;
    end_date: Date;
    created_at: Date;
    updated_at: Date;
    ActivityLanguage: {id?: number, activity_id: string, name: string}[];
    ActivityCriteria: {id?: number, activity_id: string, name: string}[];
    ActivityPartnerInstitution: {id?: number, activity_id: string, Institution: {id: string, name: string, email: string, country: string }}[];
    ActivityCourse: {id?: number, activity_id: string, Course: {id: number, name: string}}[];
    ActivityApplication: {id?: number, activity_id: string, user_id: string, status: number}[];
}

export class ActivityDTO {  
    public to_entity(activity: ActivityProps): Activity {
        return new Activity({
            id: activity.id,
            title: activity.title,
            description: activity.description,
            status_activity: activity.ActivityStatus.id,
            type_activity: activity.ActivityType.id,
            start_date: activity.start_date,
            end_date: activity.end_date,
            created_at: activity.created_at,
            updated_at: activity.updated_at,
            languages: activity.ActivityLanguage.map(lang => lang.name),
            criterias: activity.ActivityCriteria.map(crit => new Criteria({
                id: crit.id as number,
                criteria: crit.name
            })),
            partner_institutions: activity.ActivityPartnerInstitution.map(partner => new Institution({
                id: partner.Institution.id,
                name: partner.Institution.name,
                description: null,
                email: partner.Institution.email,
                country: partner.Institution.country,
                images: [],
                social_medias: [],
            })),
            courses: activity.ActivityCourse.map(course => new Course({
                id: course.Course.id,
                name: course.Course.name
            })),
            applicants: activity.ActivityApplication.map(applicant => ({id: applicant.user_id, status: applicant.status === 1 })),
        });
    }
}