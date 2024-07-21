import { UserProps } from "./UserDTO";
import { CourseProps } from "./CourseDTO";
import { CriteriaProps } from "./CriteriaDTO";
import { LanguageProps } from "./LanguageDTO";
import { InstitutionProps } from "./InstitutionDTO";
import { User } from "../../../structure/entities/User";
import { Course } from "../../../structure/entities/Course";
import { Country } from "../../../structure/entities/Country";
import { Language } from "../../../structure/entities/Language";
import { Activity } from "../../../structure/entities/Activity";
import { Criteria } from "../../../structure/entities/Criteria";
import { Institution } from "../../../structure/entities/Institution";
import { SocialMedia } from "../../../structure/entities/SocialMedia";


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
    courses: { course_id: number, course: CourseProps }[];
    languages: { language_id: number, language: LanguageProps }[];
    criterias: { criteria_id: number, criteria: CriteriaProps }[];
    partner_institutions: { institution_id: string, institution: InstitutionProps }[];
    applications: { user_id: string, user?: UserProps, status: number }[];
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
            courses: activity.courses ? activity.courses.map(course => ({
                id: course.course.id,
                course: new Course({
                    id: course.course.id,
                    course: course.course.course
                })
            })) : [],
            languages: activity.languages ? activity.languages.map(language => ({
                id: language.language.id,
                language: new Language({
                    id: language.language.id,
                    language: language.language.language,
                    language_code: language.language.language_code
                })
            })) : [],
            criterias: activity.criterias ? activity.criterias.map(criteria => ({
                id: criteria.criteria_id,
                criteria: new Criteria({
                    id: criteria.criteria.id,
                    criteria: criteria.criteria.criteria
                })
            })) : [],
            partner_institutions: activity.partner_institutions ? activity.partner_institutions.map(institution => ({
                id: institution.institution_id,
                institution: institution.institution ? new Institution({
                    id: institution.institution.id,
                    name: institution.institution.name,
                    description: institution.institution.description,
                    email: institution.institution.email,
                    countries: institution.institution.countries ? institution.institution.countries.map(country => ({
                        id: country.country.id,
                        country: new Country({
                            id: country.country.id,
                            country: country.country.country,
                            country_code: country.country.country_code
                        })
                    })) : [],
                    images: institution.institution.images ? institution.institution.images.map(image => image.image) : [],
                    social_medias: institution.institution.social_medias ? institution.institution.social_medias.map(social_media => ({
                        id: social_media.media.id,
                        media: new SocialMedia({
                            id: social_media.media.id,
                            social_media: social_media.media.name
                        }),
                        link: social_media.link
                    })) : [],
                }) : undefined
            })) : [],
            applicants: activity.applications ? activity.applications.map(application => ({
                id: application.user_id,
                user: application.user ? new User({
                    id: application.user.id,
                    name: application.user.name,
                    email: application.user.email,
                    user_type: application.user.user_type.id,
                    created_at: application.user.created_at,
                    updated_at: application.user.updated_at
                }) : undefined,
                status: application.status == 1 
            })) : []
        });
    }
}