import { randomUUID } from "crypto";
import { UniqueConstraintError } from "sequelize";

import { User } from '../../../core/structure/entities/User';
import { TokenAuth } from '../../../core/helpers/functions/token_auth';
import { UserTypeEnum } from '../../../core/helpers/enums/UserTypeEnum';
import { IUserRepo } from "../../../core/repositories/interfaces/IUserRepo";
import { InvalidRequest, MissingParameter, UserNotAllowed, UserNotAuthenticated } from '../../../core/helpers/errors/ModuleError';


export class CreateModeratorUsecase {
    public token_auth: TokenAuth;
    public database_repo: IUserRepo;

    constructor(database_repo: IUserRepo) {
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
            throw new MissingParameter("Authorization");
        }
        if (!body.name) {
            throw new MissingParameter("Name");
        }
        if (!body.email) {
            throw new MissingParameter("Email");
        }

        const user_admin_id = await this.token_auth.decode_token(headers.Authorization)
            .then(response => {
                return response;
            }).catch(error => {
                throw new UserNotAuthenticated("Invalid or expired token");
            });

        const user_admin = await this.database_repo.get_user(user_admin_id);
        if (!user_admin) {
            throw new UserNotAuthenticated();
        }
        if (user_admin.user_type !== UserTypeEnum.ADMIN) {
            throw new UserNotAllowed();
        }

        if (user_admin.email === body.email) {
            throw new UserNotAllowed("Admin can't be a moderator");
        }

        const user = await this.database_repo.get_user_by_email(body.email);
        if (user) {
            if (user.user_type === UserTypeEnum.ADMIN) {
                throw new UserNotAllowed("Admin can't be a moderator");
            }
            user.user_type = UserTypeEnum.MODERATOR;
            this.database_repo.update_user(user);
        }
        else {
            const moderator = new User({
                id: randomUUID(),
                name: body.name,
                email: body.email,
                user_type: UserTypeEnum.MODERATOR,
                created_at: new Date(),
                updated_at: new Date()
            });

            await this.database_repo.create_user(moderator);
        }

        return {
            email: body.email,
        }
    }
} 