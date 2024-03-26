import { EntityError } from "../../helpers/errors/EntityError";
import { ProjectStatusEnum } from "../../helpers/enums/ProjectStatusEnum";
import { User } from "./User";
import { Institution } from "./Institution";
import { Criteria } from "./Criteria";
import { Feedback } from "./Feedback";

class ProjectProps {
    id: string;
    title: string;
    start_date: Date;
    end_date: Date;
    description: string;
    languages: string[] | [];
    partner_institutions: Institution[] | [];
    criterias: Criteria[];
    status_project: ProjectStatusEnum;
    created_at: Date;
    updated_at: Date;
    applicants: {user: User, status: boolean}[] | [];;
    feedbacks: Feedback[] | [];
}

export class Project {
    id: string;
    title: string;
    start_date: Date;
    end_date: Date;
    description: string;
    languages: string[] | [];
    partner_institutions: Institution[] | [];
    criterias: Criteria[] | [];
    status_project: ProjectStatusEnum;
    created_at: Date;
    updated_at: Date;
    applicants: {user: User, status: boolean}[] | [];
    feedbacks: Feedback[] | [];

    constructor({ id, title, start_date, end_date, description, languages, partner_institutions, criterias, status_project, created_at, updated_at, applicants, feedbacks }: ProjectProps) {
        this.id = this.validate_set_id(id);
        this.title = this.validate_set_title(title);
        this.start_date = this.validate_set_start_date(start_date);
        this.end_date = this.validate_set_end_date(end_date);
        this.description = this.validate_set_description(description);
        this.languages = this.validate_set_languages(languages);
        this.partner_institutions = this.validate_set_partner_institutions(partner_institutions);
        this.criterias = this.validate_set_criterias(criterias);
        this.status_project = this.validate_set_status_project(status_project);
        this.created_at = this.validate_set_created_at(created_at);
        this.updated_at = this.validate_set_updated_at(updated_at);
        this.applicants = this.validate_set_applicants(applicants);
        this.feedbacks = this.validate_set_feedbacks(feedbacks);
    }

    public to_json(): {[key: string]: any}{
        return {
            id: this.id,
            title: this.title,
            start_date: this.start_date,
            end_date: this.end_date,
            description: this.description,
            languages: this.languages,
            partner_institutions: this.partner_institutions,
            criterias: this.criterias,
            status_project: this.status_project,
            created_at: this.created_at,
            updated_at: this.updated_at,
            applicants: this.applicants.map((applicant: {user: User, status: boolean}) => {return {user: applicant.user.to_json(), status: applicant.status}}),
            feedbacks: this.feedbacks.map((feedback: Feedback) => feedback.to_json())
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
        return title;
    }

    private validate_set_start_date(start_date: Date) {
        if (start_date == null) {
            throw new EntityError("Parameter start_date is required");
        }
        if (!(start_date instanceof Date)) {
            throw new EntityError("Parameter start_date must be a Date object");
        }
        if (start_date < new Date()) {
            throw new EntityError("Parameter start_date must be a date in the future");
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
        if (end_date < this.start_date) {
            throw new EntityError("Parameter end_date must be greater than start_date");
        }
        return end_date;
    }

    private validate_set_description(description: string) {
        if (description == null || description.trim() === "") {
            throw new EntityError("Parameter description is required");
        }
        return description;
    }

    private validate_set_languages(languages: string[] | []) {
        if (languages == null || languages.length === 0) {
            return [];
        }
        if (!Array.isArray(languages)) {
            throw new EntityError("Parameter languages is not an array");
        }
        if (languages.some((language) => typeof language !== "string")) {
            throw new EntityError("Parameter languages must be an array of strings");
        }
        return languages;
    }

    private validate_set_partner_institutions(partner_institutions: Institution[] | []) {
        if (partner_institutions == null || partner_institutions.length === 0) {
            return [];
        }
        if (!Array.isArray(partner_institutions)) {
            throw new EntityError("Parameter partner_institutions is not an array");
        }
        if (partner_institutions.some((institution) => !(institution instanceof Institution))) {
            throw new EntityError("Parameter partner_institutions must be an array of Institution objects");
        }
        return partner_institutions;
    }

    private validate_set_criterias(criterias: Criteria[] | []) {
        if (criterias == null || criterias.length === 0) {
            return [];
        }
        if (!Array.isArray(criterias)) {
            throw new EntityError("Parameter criterias is not an array");
        }
        if (criterias.some((criteria) => !(criteria instanceof Criteria))) {
            throw new EntityError("Parameter criterias must be an array of Criteria objects");
        }
        return criterias;
    }

    private validate_set_status_project(status_project: ProjectStatusEnum) {
        if (status_project == null) {
            throw new EntityError("Parameter status_project is required");
        }
        if (!(status_project in ProjectStatusEnum)) {
            throw new EntityError("Parameter status_project is not a valid ProjectStatusEnum value");
        }
        return status_project;
    }

    private validate_set_created_at(created_at: Date) {
        if (created_at == null) {
            throw new EntityError("Parameter created_at is required");
        }
        if (!(created_at instanceof Date)) {
            throw new EntityError("Parameter created_at must be a Date object");
        }
        if (created_at > new Date()) {
            throw new EntityError("Parameter created_at must be a date in the past");
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

    private validate_set_applicants(applicants: {user: User, status: boolean}[] | []) {
        if (applicants == null || applicants.length === 0) {
            return [];
        }
        if (!Array.isArray(applicants)) {
            throw new EntityError("Parameter applicants is not an array");
        }
        if (applicants.some((applicant) => !(applicant.user instanceof User) || typeof applicant.status !== "boolean")) {
            throw new EntityError("Parameter applicants must be an array of objects with user as User and status as boolean");
        }
        return applicants;
    }

    private validate_set_accepted(accepted: User[] | []) {
        if (accepted == null || accepted.length === 0) {
            return [];
        }
        if (!Array.isArray(accepted)) {
            throw new EntityError("Parameter accepted is not an array");
        }
        if (accepted.some((user) => !(user instanceof User))) {
            throw new EntityError("Parameter accepted must be an array of User objects");
        }
        return accepted;
    }

    private validate_set_feedbacks(feedbacks: Feedback[] | []) {
        if (feedbacks == null || feedbacks.length === 0) {
            return [];
        }
        if (!Array.isArray(feedbacks)) {
            throw new EntityError("Parameter feedbacks is not an array");
        }
        if (feedbacks.some((feedback) => !(feedback instanceof Feedback))) {
            throw new EntityError("Parameter feedbacks must be an array of Feedback objects");
        }
        return feedbacks;
    }
}