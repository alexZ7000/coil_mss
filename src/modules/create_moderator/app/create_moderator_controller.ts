import { CreateModeratorUsecase } from "./create_moderator_usecase";

import { EntityError } from '../../../core/helpers/errors/EntityError';
import { Conflict, Created, HttpRequest, HttpResponse, OK, Unauthorized } from '../../../core/helpers/http/http_codes';
import { ConflictError, InvalidParameter, InvalidRequest, MissingParameter, UserNotAuthenticated } from '../../../core/helpers/errors/ModuleError';
import { BadRequest, ParameterError, InternalServerError } from '../../../core/helpers/http/http_codes';


export class CreateModeratorController {
    public usecase: CreateModeratorUsecase;

    constructor(usecase: CreateModeratorUsecase) {
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
            
            let response = await this.usecase.execute(request.headers, request.body.body);
            return new Created(response, "Moderator created successfully");

        } catch (error) {
            if (error instanceof InvalidRequest) {
                return new BadRequest(error.message);
            }
            if (error instanceof UserNotAuthenticated) {
                return new Unauthorized(error.message);
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
            if (error instanceof MissingParameter) {
                return new ParameterError(error.message);
            }
            return new InternalServerError(error.message);
        }
    }
}