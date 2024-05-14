import { TokenAuth } from "../../../core/helpers/functions/token_auth";
import { UserTypeEnum } from "../../../core/helpers/enums/UserTypeEnum";
import { IUserRepo } from "../../../core/repositories/interfaces/IUserRepo";
import { ICourseRepo } from "../../../core/repositories/interfaces/ICourseRepo";
import { ICriteriaRepo } from "../../../core/repositories/interfaces/ICriteriaRepo";
import { ILanguageRepo } from "../../../core/repositories/interfaces/ILanguageRepo";
import { InvalidRequest, MissingParameter, UserNotAllowed, UserNotAuthenticated } from "../../../core/helpers/errors/ModuleError";

export class GetActivityRequirementsUsecase {
    public token_auth: TokenAuth;
    public user_repo: IUserRepo;
    public course_repo: ICourseRepo;
    public criteria_repo: ICriteriaRepo;
    public language_repo: ILanguageRepo;

    constructor(user_repo: IUserRepo, course_repo: ICourseRepo, criteria_repo: ICriteriaRepo, language_repo: ILanguageRepo) {
        this.token_auth = new TokenAuth();
        this.user_repo = user_repo;
        this.course_repo = course_repo;
        this.criteria_repo = criteria_repo;
        this.language_repo = language_repo;
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

        const courses = await this.course_repo.get_all_courses();
        const criteria = await this.criteria_repo.get_all_criteria();
        const languages = await this.language_repo.get_all_languages();

        return {
            courses: courses.map(course => course.to_json()),
            criteria: criteria.map(criteria => criteria.to_json()),
            languages: languages.map(language => language.to_json())
        };
    }
}