import { CreateInstitutionUsecase } from "./create_institution_usecase";
import { Institution } from "../../../core/structure/entities/Institution";

import { EntityError } from '../../../core/helpers/errors/EntityError';
import { BadRequest, ParameterError, InternalServerError } from '../../../core/helpers/http/http_codes';
import { Created, HttpRequest, HttpResponse } from '../../../core/helpers/http/http_codes';
import { MissingParameter } from '../../../core/helpers/errors/ModuleError';

export class CreateInstitutionController {
    usecase: CreateInstitutionUsecase;

    constructor(usecase: CreateInstitutionUsecase) {
        this.usecase = usecase;
    }

    async execute(request: HttpRequest): Promise<HttpResponse> {
        try {
            if (!request) {
                throw new MissingParameter("Request");
            }
            if (!request.body) { 
                throw new MissingParameter("Body");
            }
            if (!request.headers) {
                throw new MissingParameter("Headers");
            }

            await this.usecase.execute(request.body.body, request.headers);
    
            return new Created({}, "Institution created successfully");
        } catch (error) {
            if (error instanceof EntityError) {
                return new BadRequest(error.message);
            }
            if (error instanceof MissingParameter) {
                return new ParameterError(error.message);
            }

            return new InternalServerError("An internal server error occurred");
        }
    }
}