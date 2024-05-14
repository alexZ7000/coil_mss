import {
    HttpRequest,
    HttpResponse,
    OK,
    BadRequest,
    Unauthorized,
    ParameterError,
    InternalServerError,
    Forbidden,
} from "../../../core/helpers/http/http_codes";
import {
    InvalidRequest,
    MissingParameter,
    UserNotAllowed,
    UserNotAuthenticated,
} from "../../../core/helpers/errors/ModuleError";
import { GetActivityRequirementsUsecase } from "./get_activity_requirements_usecase";


export class GetActivityRequirementsController {
    public usecase: GetActivityRequirementsUsecase;

    constructor(usecase: GetActivityRequirementsUsecase) {
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

            const response = await this.usecase.execute(request.headers);
            return new OK(response, "Activity requirements found successfully");
        } catch (error: any) {
            if (error instanceof InvalidRequest) {
                return new BadRequest(error.message);
            }
            if (error instanceof UserNotAuthenticated) {
                return new Unauthorized(error.message);
            }
            if (error instanceof UserNotAllowed) {
                return new Forbidden(error.message);
            }
            if (error instanceof MissingParameter) {
                return new ParameterError(error.message);
            }
            return new InternalServerError(error.message);
        }
    }
}