import { EntityError } from "../../helpers/errors/EntityError";
import { ProjectStatusEnum } from "../../helpers/enums/ProjectStatusEnum";
import { User } from "./User";
import { Institution } from "./Institution";
import { Criteria } from "./Criteria";

class ProjectProps {
    id: number;
    title: string;
    start_date: Date;
    end_date: Date;
    description: string;
    languages: string[];
    partner_institutions: Institution[];
    criterias: Criteria[];
    status_project: ProjectStatusEnum;
    created_at: Date;
    updated_at: Date;
    applicants: User[] | null;
    accepted: User[] | null;
}

export class Project {
    id: number;
    title: string;
    start_date: Date;
    end_date: Date;
    description: string;
    languages: string[];
    partner_institutions: Institution[];
    criterias: Criteria[];
    status_project: ProjectStatusEnum;
    created_at: Date;
    updated_at: Date;
    applicants: User[] | null;
    accepted: User[] | null;

    constructor({ id, title, start_date, end_date, description, languages, partner_institutions, criterias, status_project, created_at, updated_at, applicants, accepted }: ProjectProps) {
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
        this.accepted = this.validate_set_accepted(accepted);
    }

    private validate_set_id(id: number) {
        if (id == null) {
            throw new EntityError("Parameter id is required");
        }
        if (typeof id !== "number") {
            throw new EntityError("Parameter id must be a number");
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
        return start_date;
    }

    private validate_set_end_date(end_date: Date) {
        if (end_date == null) {
            throw new EntityError("Parameter end_date is required");
        }
        if (!(end_date instanceof Date)) {
            throw new EntityError("Parameter end_date must be a Date object");
        }
        return end_date;
    }

    private validate_set_description(description: string) {
        if (description == null || description.trim() === "") {
            throw new EntityError("Parameter description is required");
        }
        return description;
    }

    private validate_set_languages(languages: string[]) {
        if (languages == null || languages.length === 0) {
            throw new EntityError("Parameter languages is required");
        }
        if (!Array.isArray(languages)) {
            throw new EntityError("Parameter languages is not an array");
        }
        return languages;
    }

    private validate_set_partner_institutions(partner_institutions: Institution[]) {
        if (partner_institutions == null || partner_institutions.length === 0) {
            throw new EntityError("Parameter partner_institutions is required");
        }
        if (!Array.isArray(partner_institutions)) {
            throw new EntityError("Parameter partner_institutions is not an array");
        }
        return partner_institutions;
    }

    private validate_set_criterias(criterias: Criteria[]) {
        if (criterias == null || criterias.length === 0) {
            throw new EntityError("Parameter criterias is required");
        }
        if (!Array.isArray(criterias)) {
            throw new EntityError("Parameter criterias is not an array");
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
        return created_at;
    }

    private validate_set_updated_at(updated_at: Date) {
        if (updated_at == null) {
            throw new EntityError("Parameter updated_at is required");
        }
        if (!(updated_at instanceof Date)) {
            throw new EntityError("Parameter updated_at must be a Date object");
        }
        return updated_at;
    }

    private validate_set_applicants(applicants: User[] | null) {
        if (!Array.isArray(applicants)) {
            throw new EntityError("Parameter applicants is not an array");
        }
        return applicants;
    }

    private validate_set_accepted(accepted: User[] | null) {
        if (!Array.isArray(accepted)) {
            throw new EntityError("Parameter accepted is not an array");
        }
        return accepted;
    }
}