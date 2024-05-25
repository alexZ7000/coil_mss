import { GetAllModeratorsUsecase } from "./get_all_moderators_usecase";

import { UniqueConstraintError } from "sequelize";
import { EntityError } from '../../../core/helpers/errors/EntityError';
import { BadRequest, ParameterError, InternalServerError } from '../../../core/helpers/http/http_codes';
import { Conflict, Created, Forbidden, HttpRequest, HttpResponse, Unauthorized, Unprocessable_Entity } from '../../../core/helpers/http/http_codes';
import { ConflictError, InvalidParameter, InvalidRequest, MissingParameter, UserNotAllowed, UserNotAuthenticated } from '../../../core/helpers/errors/ModuleError';


export class GetAllModeratorsController {
    public usecase: GetAllModeratorsUsecase;

    constructor(usecase: GetAllModeratorsUsecase) {
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

            let response = await this.usecase.execute(request.headers);
            return new Created(response, "Moderators found successfully");

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
            if (error instanceof ConflictError) {
                return new Conflict(error.message);
            }
            if (error instanceof EntityError) {
                return new ParameterError(error.message);
            }
            if (error instanceof InvalidParameter) {
                return new ParameterError(error.message);
            }
            if (error instanceof UniqueConstraintError) {
                return new Unprocessable_Entity(error.message);
            }
            if (error instanceof MissingParameter) {
                return new ParameterError(error.message);
            }
            return new InternalServerError(error.message);
        }
    }
}