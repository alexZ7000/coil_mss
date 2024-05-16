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
    created_at: Date;
    updated_at: Date;
}

class UserDTO {
    public to_entity(user: UserProps): User {
        return new User({
            id: user.id,
            name: user.name || null,
            email: user.email,
            user_type: UserTypeEnum[user.user_type.name as keyof typeof UserTypeEnum],
            created_at: user.created_at,
            updated_at: user.updated_at,
        });
    }
}

export { UserDTO, UserProps };