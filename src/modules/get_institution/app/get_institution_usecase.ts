import { Institution } from "../../../core/repositories/database/models/Models";
import { IInstitutionRepo } from "../../../core/repositories/interfaces/IInstitutionRepo";
import { ConflictError, InvalidRequest, MissingParameter, UserNotAuthenticated } from '../../../core/helpers/errors/ModuleError';
import { EntityError } from '../../../core/helpers/errors/EntityError';
import { TokenAuth } from "../../../core/helpers/functions/token_auth";

export class GetInstitutionUsecase {
    public token_auth: TokenAuth;
    public institution_repo: IInstitutionRepo;

    constructor(institution_repo: IInstitutionRepo) {
        this.institution_repo = institution_repo;
        this.token_auth = new TokenAuth();
    }

    async execute(headers: { [key: string]: any}) {
        if(!headers)
            {
                throw new InvalidRequest("Headers");
            }
        if(!headers.authorization)
            {
                throw new MissingParameter("Authorization");
            }

        const user_id = await this.token_auth
        .decode_token(headers.authorization)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            throw new UserNotAuthenticated();
        });
        

        const institution = await this.institution_repo.get_institution(headers.institution_id)
        if(!user_id){
            throw new EntityError("User not found");
        }
        
        return institution?.to_json();
    }
}