import { randomUUID } from 'crypto';

import { User } from '../../../core/structure/entities/User';
import { Course } from '../../../core/structure/entities/Course';
import { TokenAuth } from '../../../core/helpers/functions/token_auth';
import { UserTypeEnum } from '../../../core/helpers/enums/UserTypeEnum';
import { IUserRepo } from '../../../core/repositories/interfaces/IUserRepo';
import { InvalidRequest, MissingParameter, UserNotAuthenticated, UserNotAllowed } from '../../../core/helpers/errors/ModuleError';


export class AuthUserUsecase {
    public token_auth: TokenAuth;
    public database_repo: IUserRepo;

    constructor(database_repo: IUserRepo) {
        this.token_auth = new TokenAuth();
        this.database_repo = database_repo;
    }

    public async execute(headers: { [key: string]: any }): Promise<{ token: string, created_user: boolean }> {
        if (!headers) {
            throw new InvalidRequest("Headers");
        }
        if (!headers.Authorization) {
            throw new MissingParameter("Authorization");
        }

        const token_response = await this.token_auth.verify_azure_token(headers.Authorization)
            .then
            (response => {
                return response;
            }).catch(error => {
                throw new UserNotAuthenticated(error.message);
            });

        const padrao: RegExp = /@maua\.br$/;
        if (!padrao.test(token_response.mail)) {
            throw new UserNotAllowed('Invalid Email, must be a maua.br domain.');
        }

        let user: User;
        const get_user = await this.database_repo.get_user_by_email(token_response.mail);

        if (get_user) {
            if (!get_user.name) {
                get_user.name = token_response.displayName.toLowerCase().split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
                await this.database_repo.update_user(get_user);
            }
            user = new User({
                id: get_user.id,
                name: get_user.name,
                email: get_user.email,
                course: get_user.course ? new Course({
                    id: get_user.course.id,
                    name: get_user.course.name
                }) : null,
                semester_course: get_user.semester_course,
                user_type: get_user.user_type,
                created_at: get_user.created_at,
                updated_at: get_user.updated_at
            });
        } else {
            user = new User({
                id: randomUUID(),
                name: token_response.displayName.toLowerCase().split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" "), // title case
                email: token_response.mail,
                course: null,
                semester_course: null,
                user_type: UserTypeEnum.STUDENT,
                created_at: new Date(),
                updated_at: new Date()
            });
            await this.database_repo.create_user(user);
        }

        return {
            token: await this.token_auth.generate_token(user.id),
            created_user: !get_user
        }
    }
}
