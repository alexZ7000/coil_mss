import { User } from "./User";
import { Course } from "./Course";
import { Language } from "./Language";
import { Criteria } from "./Criteria";
import { Institution } from "./Institution";
import { EntityError } from "../../helpers/errors/EntityError";
import { ActivityTypeEnum } from "../../helpers/enums/ActivityTypeEnum";
import { ActivityStatusEnum } from "../../helpers/enums/ActivityStatusEnum";
import { name } from "aws-sdk/clients/importexport";

class ActivityProps {
    id: string;
    title: string;
    start_date: Date;
    end_date: Date;
    description: string;
    languages: { id: number, language?: Language }[];
    courses: { id: number, course?: Course }[];
    partner_institutions: { id: string, institution?: Institution }[];
    criterias: { id: number, criteria?: Criteria }[];
    status_activity: ActivityStatusEnum;
    type_activity: ActivityTypeEnum;
    created_at: Date;
    updated_at: Date;
    applicants: { id: string, status: boolean, user?: User }[];
}

export class Activity {
    id: string;
    title: string;
    start_date: Date;
    end_date: Date;
    description: string;
    languages: { id: number, language?: Language }[];
    courses: { id: number, course?: Course }[];
    partner_institutions: { id: string, institution?: Institution }[];
    criterias: { id: number, criteria?: Criteria }[];
    status_activity: ActivityStatusEnum;
    type_activity: ActivityTypeEnum;
    created_at: Date;
    updated_at: Date;
    applicants: { id: string, status: boolean, user?: User }[];

    constructor(props: ActivityProps) {
        this.id = this.validate_set_id(props.id);
        this.title = this.validate_set_title(props.title);
        this.start_date = this.validate_set_start_date(props.start_date);
        this.end_date = this.validate_set_end_date(props.end_date);
        this.description = this.validate_set_description(props.description);
        this.languages = this.validate_set_languages(props.languages);
        this.partner_institutions = this.validate_set_partner_institutions(props.partner_institutions);
        this.criterias = this.validate_set_criterias(props.criterias);
        this.status_activity = this.validate_set_status_activity(props.status_activity);
        this.type_activity = this.validate_set_type_activity(props.type_activity);
        this.created_at = this.validate_set_created_at(props.created_at);
        this.updated_at = this.validate_set_updated_at(props.updated_at);
        this.applicants = this.validate_set_applicants(props.applicants);
        this.courses = this.validate_set_courses(props.courses);
    }

    public to_json(): { [key: string]: any } {
        return {
            id: this.id,
            title: this.title,
            start_date: this.start_date,
            end_date: this.end_date,
            description: this.description,
            languages: this.languages.map(language => language.language?.to_json()),
            partner_institutions: this.partner_institutions.map(institution => institution.institution?.to_json()),
            criterias: this.criterias.map(criteria => criteria.criteria?.to_json()),
            status_activity: this.status_activity,
            type_activity: this.type_activity,
            created_at: this.created_at,
            updated_at: this.updated_at,
            applicants: this.applicants,
            courses: this.courses.map(course => course.course?.to_json())
        };
    }

    private validate_set_id(id: string) {
        if (id == null) {
            throw new EntityError("Parameter id is required");
        }
        if (typeof id !== "string") {
            throw new EntityError("Parameter id must be a string");
        }
        if (id.length !== 36) {
            throw new EntityError("Parameter id must be a valid UUID string");
        }
        return id;
    }

    private validate_set_title(title: string) {
        if (title == null || title.trim() === "") {
            throw new EntityError("Parameter title is required");
        }
        if (title.length < 3 || title.length > 255) {
            throw new EntityError("Parameter title must be between 3 and 255 characters");
        }
        return title;
    }

    private validate_set_start_date(start_date: Date) {
        if (start_date == null) {
            throw new EntityError("Parameter start_date is required");
        }
        if (!(start_date instanceof Date)) {
            throw new EntityError("Parameter start_date must be a Date object");
        }
        return start_date;
    }

    private validate_set_end_date(end_date: Date) {
        if (end_date == null) {
            throw new EntityError("Parameter end_date is required");
        }
        if (!(end_date instanceof Date)) {
            throw new EntityError("Parameter end_date must be a Date object");
        }
        if (end_date <= this.start_date) {
            throw new EntityError("Parameter end_date must be greater than start_date");
        }
        return end_date;
    }

    private validate_set_description(description: string) {
        if (description == null || description.trim() === "") {
            throw new EntityError("Parameter description is required");
        }
        if (description.length < 3 || description.length > 65535) {
            throw new EntityError("Parameter description must be between 3 and 65535 characters");
        }
        return description;
    }

    private validate_set_languages(languages: { id: number, language?: Language }[]) {
        if (languages == null || languages.length === 0) {
            return [];
        }
        return languages;
    }

    private validate_set_partner_institutions(partner_institutions: { id: string, institution?: Institution }[]) {
        if (partner_institutions == null || partner_institutions.length === 0) {
            return [];
        }
        return partner_institutions;
    }

    private validate_set_criterias(criterias: { id: number, criteria?: Criteria }[]) {
        if (criterias == null || criterias.length === 0) {
            return [];
        }
        return criterias;
    }

    private validate_set_status_activity(status_activity: ActivityStatusEnum) {
        if (status_activity == null) {
            throw new EntityError("Parameter status_activity is required");
        }
        if (!(status_activity in ActivityStatusEnum)) {
            throw new EntityError("Parameter status_activity is not a valid ActivityStatusEnum value");
        }
        return status_activity;
    }

    private validate_set_type_activity(type_activity: ActivityTypeEnum) {
        if (type_activity == null) {
            throw new EntityError("Parameter type_activity is required");
        }
        if (!(type_activity in ActivityTypeEnum)) {
            throw new EntityError("Parameter type_activity is not a valid ActivityTypeEnum value");
        }
        return type_activity;
    }

    private validate_set_created_at(created_at: Date) {
        if (created_at == null) {
            throw new EntityError("Parameter created_at is required");
        }
        if (!(created_at instanceof Date)) {
            throw new EntityError("Parameter created_at must be a Date object");
        }
        return created_at;
    }

    private validate_set_updated_at(updated_at: Date) {
        if (updated_at == null) {
            throw new EntityError("Parameter updated_at is required");
        }
        if (!(updated_at instanceof Date)) {
            throw new EntityError("Parameter updated_at must be a Date object");
        }
        if (updated_at < this.created_at) {
            throw new EntityError("Parameter updated_at must be greater than created_at");
        }
        return updated_at;
    }

    private validate_set_applicants(applicants: { id: string, status: boolean, user?: User }[]) {
        if (applicants == null || applicants.length === 0) {
            return [];
        }
        return applicants;
    }

    private validate_set_courses(courses: { id: number, course?: Course }[]) {
        if (courses == null || courses.length === 0) {
            return [];
        }
        return courses;
    }
}