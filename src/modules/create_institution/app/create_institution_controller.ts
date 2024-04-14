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
            if (!request.body || !request.body.body) { 
                throw new MissingParameter("Body");
            }

            const institutionData = request.body.body;

            if (!institutionData.id || !institutionData.name || !institutionData.description || !institutionData.email ) {
                throw new MissingParameter("InstitutionData");
            }

            const institution = new Institution({
                id: institutionData.id,
                name: institutionData.name,
                description: institutionData.description,
                email: institutionData.email,
                country: institutionData.country,
                images: institutionData.images,
                social_medias: institutionData.social_medias
            });

            await this.usecase.execute(institution);
    
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