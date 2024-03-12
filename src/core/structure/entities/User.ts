import { UserTypeEnum } from "../../helpers/enums/UserTypeEnum";
import { EntityError } from "../../helpers/errors/EntityError";

export class User {
    id: string; // UUID
    name: string; 
    email: string; 
    user_type: UserTypeEnum;
    course: string;
    semester_course: number;

    
    contructor(id: string, name: string, email: string, user_type: UserTypeEnum, course: string, semester_course: number) {
        this.id = this.validate_set_id(id);
        this.name = this.validate_set_name(name);
        this.email = this.validate_set_email(email);
        this.user_type = this.validate_set_user_type(user_type);
        this.course = this.validate_set_course(course);
        this.semester_course = this.validate_set_semester_course(semester_course);
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

    private validate_set_name(name: string) {
        if (name == null || name == "") {
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
        return email;
    }

    private validate_set_user_type(user_type: UserTypeEnum) {
        if (user_type == null) {
            throw new EntityError("Parameter user_type is required");
        }
        if (typeof user_type !== "string") {
            throw new EntityError("Parameter user_type is not a UserTypeEnum");
        }
        return user_type;
    }

    private validate_set_course(course: string) {
        if (course == null || course == "") {
            throw new EntityError("Parameter course is required");
        }
        if (typeof course !== "string") {
            throw new EntityError("Parameter course is not a string");
        }
        return course;
    }

    private validate_set_semester_course(semester_course: number) {
        if (semester_course == null || semester_course == 0) {
            throw new EntityError("Parameter semester_course is required");
        }
        if (typeof semester_course !== "number") {
            throw new EntityError("Parameter semester_course is not a number");
        }
        return semester_course;
    }
}
