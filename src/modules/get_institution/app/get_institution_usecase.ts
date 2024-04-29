import { Institution } from "../../../core/repositories/database/models/Models";
import { IInstitutionRepo } from "../../../core/repositories/interfaces/IInstitutionRepo";
import { ConflictError, InvalidRequest, MissingParameter, UserNotAuthenticated, UserNotAllowed } from '../../../core/helpers/errors/ModuleError';
import { EntityError } from '../../../core/helpers/errors/EntityError';
import { TokenAuth } from "../../../core/helpers/functions/token_auth";
import { IUserRepo } from "../../../core/repositories/interfaces/IUserRepo";
import { UserTypeEnum } from '../../../core/helpers/enums/UserTypeEnum';


export class GetInstitutionUsecase {
    public token_auth: TokenAuth;
    public institution_repo: IInstitutionRepo;
    public user_repo: IUserRepo;

    constructor(institution_repo: IInstitutionRepo, user_repo: IUserRepo) {
        this.institution_repo = institution_repo;
        this.token_auth = new TokenAuth();
        this.user_repo = user_repo;
    }

    async execute(institutionData: any, headers: any) {
        if(!headers)
            {
                throw new InvalidRequest("Headers");
            }
        if(!headers.authorization)
            {
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

        const user = await this.user_repo.get_user(user_id);
        if (!user) {
            throw new UserNotAuthenticated();
        }

        if (user.user_type === UserTypeEnum.STUDENT) {
            throw new UserNotAllowed();
        }
        

        const institution = await this.institution_repo.get_institution(institutionData.institution_id)
        if(!institution){
            throw new EntityError("Institution not found");
        }
        
        return institution?.to_json();
    }
}