import { GetInstitutionUsecase } from "./get_institution_usecase";

import { EntityError } from '../../../core/helpers/errors/EntityError';
import { Conflict, OK, Unauthorized } from '../../../core/helpers/http/http_codes';
import { ConflictError, InvalidParameter, InvalidRequest, MissingParameter, UserNotAuthenticated } from '../../../core/helpers/errors/ModuleError';
import { ParameterError, InternalServerError } from '../../../core/helpers/http/http_codes';


export class GetInstitutionController {
    public usecase: GetInstitutionUsecase;

    constructor(usecase: GetInstitutionUsecase) {
        this.usecase = usecase;
    }

    public async execute( id: string): Promise<{ [key: string]: any }> {
        try {
            
            
            let response = await this.usecase.execute(id);
            return response;

        } catch (error) {
            if (error instanceof InvalidRequest) {
                return new ParameterError(error.message);
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