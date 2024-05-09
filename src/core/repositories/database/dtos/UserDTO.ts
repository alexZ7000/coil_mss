import { User } from "../../../structure/entities/User";
import { Course } from "../../../structure/entities/Course";
import { UserTypeEnum } from "../../../helpers/enums/UserTypeEnum";


class ToEntityProps {
    id: string;
    name: string | null;
    email: string;
    UserType: {
        id: number;
        name: string;
    };
    Course: 
    { 
        id: number,
        name: string 
    } | null;
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
            user_type: UserTypeEnum[user.UserType.name],
            course: user.Course ? new Course({
                id: user.Course.id,
                name: user.Course.name,
            }) : null,
            semester_course: user.semester || null,
            created_at: user.created_at,
            updated_at: user.updated_at,
        });
    }
}