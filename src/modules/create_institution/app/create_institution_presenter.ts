import { CreateInstitutionUsecase } from "./create_institution_usecase";
import { CreateInstitutionController } from "./create_institution_controller";

import { HttpRequest } from "../../../core/helpers/http/http_codes";
import { Repository } from "../../../core/repositories/Repository";

const repository = new Repository({ user_repo: true, institution_repo: true });

const usecase = new CreateInstitutionUsecase(repository.InstitutionRepo, repository.UserRepo);
const controller = new CreateInstitutionController(usecase);

export const handler = async (event: any, context: any) => {
    let request = new HttpRequest(event);
    let response  = await controller.execute(request);
    return response.to_json();
}