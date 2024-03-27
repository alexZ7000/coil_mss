import { User } from "../../../structure/entities/User";
import { Course } from "../../../structure/entities/Course";
import { UserTypeEnum } from "../../../helpers/enums/UserTypeEnum";


class ToEntityProps {
    id: string;
    name: string | null;
    email: string;
    user_type: {
        id: number;
        name: string;
    };
    course: 
    { 
        id: number,
        name: string 
    } | null;
    semester: number | null;
    created_at: Date;
    updated_at: Date;
}

class ToDatabaseProps {
    id: string;
    name: string | null;
    email: string;
    user_type_id: number;
    course_id: number | null;
    semester: number | null;
    created_at: Date;
    updated_at: Date;
}
    

export class UserDTO {
    public to_entity(user: ToEntityProps): User {
        return new User({
            id: user.id,
            name: user.name || null,
            email: user.email,
            user_type: UserTypeEnum[user.user_type.name],
            course: user.course ? new Course({
                id: user.course.id,
                name: user.course.name,
            }) : null,
            semester_course: user.semester || null,
            created_at: user.created_at,
            updated_at: user.updated_at,
        });
    }

    public to_database(user: User): ToDatabaseProps {
        return {
            id: user.id,
            name: user.name || null,
            email: user.email,
            user_type_id: user.user_type,
            course_id: user.course ? user.course.id : null,
            semester: user.semester_course || null,
            created_at: user.created_at,
            updated_at: user.updated_at,
        };
    }
}