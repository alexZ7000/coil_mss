import { CreateInstitutionUsecase } from "./create_institution_usecase";
import { Institution } from "../../../core/structure/entities/Institution";

import { EntityError } from '../../../core/helpers/errors/EntityError';
import { Created, Forbidden, HttpRequest, HttpResponse, Unauthorized, Unprocessable_Entity } from '../../../core/helpers/http/http_codes';
import { BadRequest, ParameterError, InternalServerError } from '../../../core/helpers/http/http_codes';
import { InvalidParameter, InvalidRequest, MissingParameter, UserNotAllowed, UserNotAuthenticated } from '../../../core/helpers/errors/ModuleError';
import { UniqueConstraintError } from "sequelize";
import { UnauthenticatedAction } from "aws-cdk-lib/aws-elasticloadbalancingv2";

export class CreateInstitutionController {
    usecase: CreateInstitutionUsecase;

    constructor(usecase: CreateInstitutionUsecase) {
        this.usecase = usecase;
    }

    async execute(request: HttpRequest): Promise<HttpResponse> {
        try {
            if (!request) {
                throw new InvalidRequest();
            }
            if (!request.body) {
                throw new InvalidRequest("Body");
            }
            if (!request.headers) {
                throw new InvalidRequest("Headers");
            }

            const usecase = await this.usecase.execute(request.body.body, request.headers);
            return new Created(usecase, "Institution created successfully");

        } catch (error: any) {
            if (error instanceof InvalidRequest) {
                return new BadRequest(error.message);
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
            if (error instanceof UserNotAllowed) {
                return new Forbidden(error.message);
            }
            if (error instanceof UserNotAuthenticated) {
                return new Unauthorized(error.message);
            }
            if (error instanceof UniqueConstraintError) {
                return new Unprocessable_Entity(error.message)
            }
            return new InternalServerError(error.message);
        }
    }
}