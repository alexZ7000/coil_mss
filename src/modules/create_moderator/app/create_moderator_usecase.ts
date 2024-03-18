import { DatabaseInterface } from "../../../core/repositories/Interfaces/DatabaseInterface";
import { User } from '../../../core/structure/entities/User';
import { TokenAuth } from '../../../core/helpers/functions/token_auth';
import { UserTypeEnum } from '../../../core/helpers/enums/UserTypeEnum';
import { InvalidRequest, MissingParameter, UserNotAuthenticated } from '../../../core/helpers/errors/ModuleError';
import { randomUUID } from "crypto";



export class CreateModeratorUsecase {
    public token_auth: TokenAuth;
    public database_repo: DatabaseInterface;
    
    constructor(database_repo: DatabaseInterface) {
        this.token_auth = new TokenAuth();
        this.database_repo = database_repo;
    }

    public async execute(headers: { [key: string]: any }, body: { [key: string]: any }) {
        if (!headers) {
            throw new InvalidRequest("Headers");
        }
        if (!body) {
            throw new InvalidRequest("Body");
        }
        if (!headers.Authorization) {
            throw new UserNotAuthenticated();
        }
        if (!body.name) {
            throw new MissingParameter("Name");
        }
        if (!body.email) {
            throw new MissingParameter("Email");
        }

        const user_admin_id = await this.token_auth.decode_token(headers.Authorization)
        .then(response => {
            if (!response) {
                throw new UserNotAuthenticated("Invalid or expired token.");
            }
            return response.sub;
        }).catch(error => {
            throw new UserNotAuthenticated("Invalid or expired token.");
        });

        const user_admin = await this.database_repo.get_user(user_admin_id as string);
        if (!user_admin) {
            throw new UserNotAuthenticated("User not found.");
        }
        if (user_admin.user_type !== UserTypeEnum.ADMIN) {
            throw new UserNotAuthenticated();
        }

        const moderator = new User({
            id: randomUUID(),
            name: body.name,
            email: body.email,
            course: null,
            semester_course: null,
            user_type: UserTypeEnum.MODERATOR,
            created_at: new Date(),
            updated_at: new Date()
        });

        await this.database_repo.create_user(moderator);

        return {
            name: moderator.name,
            email: moderator.email,
        }
    }
} 