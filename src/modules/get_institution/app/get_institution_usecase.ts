import { TokenAuth } from "../../../core/helpers/functions/token_auth";
import { IUserRepo } from "../../../core/repositories/interfaces/IUserRepo";
import { IInstitutionRepo } from "../../../core/repositories/interfaces/IInstitutionRepo";
import { InvalidRequest, MissingParameter, UserNotAuthenticated, NotfoundError } from '../../../core/helpers/errors/ModuleError';


export class GetInstitutionUsecase {
    public token_auth: TokenAuth;
    public institution_repo: IInstitutionRepo;
    public user_repo: IUserRepo;

    constructor(institution_repo: IInstitutionRepo, user_repo: IUserRepo) {
        this.institution_repo = institution_repo;
        this.token_auth = new TokenAuth();
        this.user_repo = user_repo;
    }

    async execute(headers: any, institutionData: any) {
        if (!headers) {
            throw new InvalidRequest("Headers");
        }
        if (!headers.Authorization) {
            throw new MissingParameter("Authorization");
        }

        if (!institutionData.institution_id) {
            throw new MissingParameter("Institution ID");
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

        const institution = await this.institution_repo.get_institution(institutionData.institution_id)
        if (!institution) {
            throw new NotfoundError("Institution not found")
        }

        return institution?.to_json();
    }
}