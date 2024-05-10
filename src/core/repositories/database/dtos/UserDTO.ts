import { User } from "../../../structure/entities/User";
import { Course } from "../../../structure/entities/Course";
import { UserTypeEnum } from "../../../helpers/enums/UserTypeEnum";


class UserProps {
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

class UserDTO {
    public to_entity(user: UserProps): User {
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
}

export { UserDTO, UserProps };