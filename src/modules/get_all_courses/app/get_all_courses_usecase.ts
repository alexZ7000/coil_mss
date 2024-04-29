import { TokenAuth } from "../../../core/helpers/functions/token_auth";
import { UserTypeEnum } from "../../../core/helpers/enums/UserTypeEnum";
import { IUserRepo } from "../../../core/repositories/interfaces/IUserRepo";
import { ICourseRepo } from "../../../core/repositories/interfaces/ICourseRepo";
import { InvalidParameter, InvalidRequest, MissingParameter, UserNotAuthenticated } from "../../../core/helpers/errors/ModuleError";

export class GetAllCoursesUsecase {
    public token_auth: TokenAuth;
    public user_repo: IUserRepo;
    public course_repo: ICourseRepo;
    
    constructor(user_repo: IUserRepo, course_repo: ICourseRepo) {
        this.token_auth = new TokenAuth();
        this.user_repo = user_repo;
        this.course_repo = course_repo;
    }
    
    async execute(headers: { [key: string]: any }, queryStringParameters: { [key: string]: any }) {
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
    
        const courses = await this.course_repo.get_all_courses();
        return courses ? courses.map(course => course.to_json()) : [];
    }
    }