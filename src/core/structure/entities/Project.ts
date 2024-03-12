import { EntityError } from "../../helpers/errors/EntityError";

export class Project {
    id: string; // UUID
    title: string; 
    description: string; 
    languages: string[] = [];
    criterias: string[] = [];
    partner_institutions: string[] = [];
    owner: string;
    published: boolean;
    published_at: Date;
    created_at: Date;
    updated_at: Date;
    
    constructor(
        id: string, 
        title: string, 
        description: string, 
        languages: string[], 
        criterias: string[], 
        partner_institutions: string[], 
        owner: string, 
        published: boolean, 
        published_at: Date, 
        created_at: Date, 
        updated_at: Date
    ) {
        this.id = this.validate_set_id(id);
        this.title = this.validate_set_title(title);
        this.description = this.validate_set_description(description);
        this.languages = this.validate_set_languages(languages);
        this.criterias = this.validate_set_criterias(criterias);
        this.partner_institutions = this.validate_set_partner_institutions(partner_institutions);
        this.owner = this.validate_set_owner(owner);
        this.published = this.validate_set_published(published);
        this.published_at = this.validate_set_published_at(published_at);
        this.created_at = this.validate_set_created_at(created_at);
        this.updated_at = this.validate_set_updated_at(updated_at);
    }
    private validate_set_id(id: string) {
        if (id == null || id == "") {
            throw new EntityError("Parameter id is required");
        }
        if (typeof id !== "string") {
            throw new EntityError("Parameter id is not a string");
        }
        if (id.length != 36) {
            throw new EntityError("Parameter id is not a valid UUID");
        }
        return id;
    }

    private validate_set_title(title: string) {
        if (title == null || title == "") {
            throw new EntityError("Parameter title is required");
        }
        if (typeof title !== "string") {
            throw new EntityError("Parameter title is not a string");
        }
        if (title.length > 100) {
            throw new EntityError("Parameter title is too long (max 100 characters)");
        }
        return title;
    }

    private validate_set_description(description: string) {
        if (description == null || description == "") {
            throw new EntityError("Parameter description is required");
        }
        if (typeof description !== "string") {
            throw new EntityError("Parameter description is not a string");
        }
        if (description.length > 500) {
            throw new EntityError("Parameter description is too long (max 500 characters)");
        }
        return description;
    }

    private validate_set_languages(languages: string[]) {
        if (languages == null || languages.length == 0) {
            throw new EntityError("Parameter languages is required");
        }
        if (!Array.isArray(languages)) {
            throw new EntityError("Parameter languages is not an array");
        }
        return languages;
    }

    private validate_set_criterias(criterias: string[]) {
        if (criterias == null || criterias.length == 0) {
            throw new EntityError("Parameter criterias is required");
        }
        if (!Array.isArray(criterias)) {
            throw new EntityError("Parameter criterias is not an array");
        }
        return criterias;
    }

    private validate_set_partner_institutions(partner_institutions: string[]) {
        if (partner_institutions == null || partner_institutions.length == 0) {
            throw new EntityError("Parameter partner_institutions is required");
        }
        if (!Array.isArray(partner_institutions)) {
            throw new EntityError("Parameter partner_institutions is not an array");
        }
        return partner_institutions;
    }

    private validate_set_owner(owner: string) {
        if (owner == null || owner == "") {
            throw new EntityError("Parameter owner is required");
        }
        if (typeof owner !== "string") {
            throw new EntityError("Parameter owner is not a string");
        }
        if (owner.length != 36) {
            throw new EntityError("Parameter owner is not a valid UUID");
        }
        return owner;
    }

    private validate_set_published(published: boolean) {
        if (published == null) {
            throw new EntityError("Parameter published is required");
        }
        if (typeof published !== "boolean") {
            throw new EntityError("Parameter published is not a boolean");
        }
        return published;
    }

    private validate_set_published_at(published_at: Date) {
        if (published_at == null) {
            throw new EntityError("Parameter published_at is required");
        }
        if (!(published_at instanceof Date)) {
            throw new EntityError("Parameter published_at is not a Date");
        }
        return published_at;
    }

    private validate_set_created_at(created_at: Date) {
        if (created_at == null) {
            throw new EntityError("Parameter created_at is required");
        }
        if (!(created_at instanceof Date)) {
            throw new EntityError("Parameter created_at is not a Date");
        }
        return created_at;
    }

    private validate_set_updated_at(updated_at: Date) {
        if (updated_at == null) {
            throw new EntityError("Parameter updated_at is required");
        }
        if (!(updated_at instanceof Date)) {
            throw new EntityError("Parameter updated_at is not a Date");
        }
        return updated_at;
    }
}