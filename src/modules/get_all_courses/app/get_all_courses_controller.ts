import {
    HttpRequest,
    HttpResponse,
    OK,
    BadRequest,
    Unauthorized,
    ParameterError,
    InternalServerError,
  } from "../../../core/helpers/http/http_codes";
  import {
    InvalidRequest,
    MissingParameter,
    UserNotAuthenticated,
  } from "../../../core/helpers/errors/ModuleError";
    import { GetAllCoursesUsecase } from "./get_all_courses_usecase";

export class GetAllCoursesController {
    public usecase: GetAllCoursesUsecase;
    
    constructor(usecase: GetAllCoursesUsecase) {
        this.usecase = usecase;
    }
    
    public async execute(request: HttpRequest): Promise<HttpResponse> {
        try {
        if (!request) {
            throw new InvalidRequest();
        }
        if (!request.headers) {
            throw new InvalidRequest("Headers");
        }
        if (!request.body) {
            throw new InvalidRequest("Body");
        }
    
        const queryParams = request.body.queryStringParameters;
    
        const response = await this.usecase.execute(request.headers, queryParams);
        return new OK(response, "Courses found successfully");
        } catch (error) {
        if (error instanceof InvalidRequest) {
            return new BadRequest(error.message);
        }
        if (error instanceof UserNotAuthenticated) {
            return new Unauthorized(error.message);
        }
        if (error instanceof MissingParameter) {
            return new ParameterError(error.message);
        }
        return new InternalServerError(error.message);
        }
    }
    }