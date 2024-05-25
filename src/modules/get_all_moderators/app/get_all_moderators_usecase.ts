import { randomUUID } from "crypto";
import { UniqueConstraintError } from "sequelize";

import { User } from '../../../core/structure/entities/User';
import { TokenAuth } from '../../../core/helpers/functions/token_auth';
import { UserTypeEnum } from '../../../core/helpers/enums/UserTypeEnum';
import { IUserRepo } from "../../../core/repositories/interfaces/IUserRepo";
import { InvalidRequest, MissingParameter, UserNotAllowed, UserNotAuthenticated } from '../../../core/helpers/errors/ModuleError';


export class GetAllModeratorsUsecase {
    public token_auth: TokenAuth;
    public database_repo: IUserRepo;

    constructor(database_repo: IUserRepo) {
        this.token_auth = new TokenAuth();
        this.database_repo = database_repo;
    }

    public async execute(headers: { [key: string]: any }) {
        if (!headers) {
            throw new InvalidRequest("Headers");
        }
        if (!headers.Authorization) {
            throw new MissingParameter("Authorization");
        }

        const user_id = await this.token_auth
            .decode_token(headers.Authorization)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw new UserNotAuthenticated("Invalid or expired token");
            });

        const user = await this.database_repo.get_user(user_id);
        if (!user) {
            throw new UserNotAuthenticated();
        }

        const moderators = await this.database_repo.get_all_moderators();

        return moderators;
    }
} 