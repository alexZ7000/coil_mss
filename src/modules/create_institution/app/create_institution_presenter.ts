import { CreateInstitutionUsecase } from "./create_institution_usecase";
import { CreateInstitutionController } from "./create_institution_controller";

import { InstitutionRepo } from "../../../core/repositories/database/repositories/InstitutionRepo";
import { UserRepo } from "../../../core/repositories/database/repositories/UserRepo";
import { HttpRequest } from "../../../core/helpers/http/http_codes";

const institutionRepo = new InstitutionRepo();
const userRepo = new UserRepo();

const usecase = new CreateInstitutionUsecase(institutionRepo, userRepo);
const controller = new CreateInstitutionController(usecase);

export const handler = async (event: any) => {
    let request = new HttpRequest(event);
    let response  = await controller.execute(request);
    return response.to_json();
}