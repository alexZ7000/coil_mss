import { GetInstitutionUsecase } from "./get_institution_usecase";

import { EntityError } from '../../../core/helpers/errors/EntityError';
import { Conflict, OK, Unauthorized, BadRequest, HttpRequest, HttpResponse, Forbidden, NotFound} from '../../../core/helpers/http/http_codes';
import { ConflictError, InvalidParameter, InvalidRequest, MissingParameter, NotfoundError, UserNotAllowed, UserNotAuthenticated } from '../../../core/helpers/errors/ModuleError';
import { ParameterError, InternalServerError } from '../../../core/helpers/http/http_codes';


export class GetInstitutionController {
    public usecase: GetInstitutionUsecase;

    constructor(usecase: GetInstitutionUsecase) {
        this.usecase = usecase;
    }

    public async execute(request: HttpRequest): Promise<HttpResponse> {
        try {
            if(!request)
                {
                    throw new InvalidRequest();

                }
            if(!request.headers)
                {
                    throw new InvalidRequest("Headers");

                }
            if(!request.body){
                throw new InvalidRequest("Body");
            }

            let response = await this.usecase.execute(request.headers, request.body.queryStringParameters);
            return new OK(response, "Institution found");

        } catch (error) {
            if (error instanceof InvalidRequest) {
                return new ParameterError(error.message);
            }
            if (error instanceof UserNotAuthenticated) {
                return new Unauthorized(error.message);
            }
            if (error instanceof UserNotAllowed) {
                return new Forbidden(error.message);
            }
            if (error instanceof NotfoundError) {
                return new NotFound(error.message);
            }
            if (error instanceof EntityError) {
                return new ParameterError(error.message);
            }
            if (error instanceof InvalidParameter) {
                return new ParameterError(error.message);
            }
            if (error instanceof MissingParameter) {
                return new ParameterError(error.message);
            }
            return new InternalServerError(error.message);
        }
    }
}