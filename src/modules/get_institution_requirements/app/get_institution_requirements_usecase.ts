import { TokenAuth } from "../../../core/helpers/functions/token_auth";
import { UserTypeEnum } from "../../../core/helpers/enums/UserTypeEnum";
import { IUserRepo } from "../../../core/repositories/interfaces/IUserRepo";
import { ICountryRepo } from "../../../core/repositories/interfaces/ICountryRepo";
import { ISocialMediaRepo } from "../../../core/repositories/interfaces/ISocialMediaRepo";
import { InvalidRequest, MissingParameter, UserNotAllowed, UserNotAuthenticated } from "../../../core/helpers/errors/ModuleError";

export class GetInstitutionRequirementsUsecase {
    public token_auth: TokenAuth;
    public user_repo: IUserRepo;
    public country_repo: ICountryRepo;
    public social_media_repo: ISocialMediaRepo;

    constructor(user_repo: IUserRepo, country_repo: ICountryRepo, social_media_repo: ISocialMediaRepo) {
        this.token_auth = new TokenAuth();
        this.user_repo = user_repo;
        this.country_repo = country_repo;
        this.social_media_repo = social_media_repo;
    }

    async execute(headers: { [key: string]: any }) {
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

        const user = await this.user_repo.get_user(user_id);
        if (!user) {
            throw new UserNotAuthenticated();
        }
        if (![UserTypeEnum.ADMIN, UserTypeEnum.MODERATOR].includes(user.user_type)) {
            throw new UserNotAllowed();
        }

        const countries = await this.country_repo.get_all_countries();
        const social_media = await this.social_media_repo.get_all_social_media();

        return {
            countries: countries.map(country => country.to_json()),
            social_medias: social_media.map(social_media => social_media.to_json()),	
        }
    }
}