import { EntityError } from "../../helpers/errors/EntityError";
import { UserTypeEnum } from "../../helpers/enums/UserTypeEnum";

class UserProps {
    id: string;
    name: string | null;
    email: string;
    user_type: UserTypeEnum;
    course: string | null;
    semester_course: number | null;
    created_at: Date;
    updated_at: Date;
}

export class User {
    id: string; // UUID
    name: string | null; 
    email: string; 
    user_type: UserTypeEnum;
    course: string | null;
    semester_course: number | null;
    created_at: Date;
    updated_at: Date;

    constructor({ id, name, email, user_type, course, semester_course, created_at, updated_at }: UserProps) {
        this.id = this.validate_set_id(id);
        this.name = this.validate_set_name(name, user_type);
        this.email = this.validate_set_email(email);
        this.user_type = this.validate_set_user_type(user_type);
        this.course = this.validate_set_course(course);
        this.semester_course = this.validate_set_semester_course(semester_course);
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

    private validate_set_name(name: string | null, user_type: UserTypeEnum) {
        if (user_type == UserTypeEnum.MODERATOR && name == null) {
            return null;
        } else if ((user_type != UserTypeEnum.MODERATOR && (name == null || name == ""))) {
            throw new EntityError("Parameter name is required");
        }
        if (typeof name !== "string") {
            throw new EntityError("Parameter name is not a string");
        }
        return name;
    }

    private validate_set_email(email: string) {
        if (email == null || email == "") {
            throw new EntityError("Parameter email is required");
        }
        if (typeof email !== "string") {
            throw new EntityError("Parameter email is not a string");
        }
        let padrao: RegExp = /^[a-zA-Z0-9._%+-]+@maua\.br$/;
        if (!padrao.test(email)) {
            throw new EntityError("Invalid Email, must be a maua.br domain.");
        }
        return email;
    }

    private validate_set_user_type(user_type: UserTypeEnum) {
        if (user_type == null) {
            throw new EntityError("Parameter user_type is required");
        }
        if (!(user_type in UserTypeEnum)) {
            throw new EntityError("Parameter user_type is not a UserTypeEnum");
        }
        return user_type;
    }
    
    private validate_set_course(course: string | null) {
        if (course == null || course == "") {
            return null;
        }
        if (typeof course !== "string") {
            throw new EntityError("Parameter course is not a string");
        }
        return course;
    }
    
    private validate_set_semester_course(semester_course: number | null) {
        if (semester_course == null) {
            return null;
        }
        if (typeof semester_course !== "number") {
            throw new EntityError("Parameter semester_course is not a number");
        }
        return semester_course;
    }

    private validate_set_created_at(created_at: Date) {
        if (created_at == null) {
            throw new EntityError("Parameter created_at is required");
        }
        if (typeof created_at !== "object") {
            throw new EntityError("Parameter created_at is not a Date");
        }
        return created_at;
    }

    private validate_set_updated_at(updated_at: Date) {
        if (updated_at == null) {
            throw new EntityError("Parameter updated_at is required");
        }
        if (typeof updated_at !== "object") {
            throw new EntityError("Parameter updated_at is not a Date");
        }
        return updated_at;
    }
}