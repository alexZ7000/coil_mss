import { GetInstitutionController } from "./get_institution_controler";
import { GetInstitutionUsecase } from "./get_institution_usecase";

import { Repository } from "../../../core/repositories/Repository";
import { HttpRequest } from "../../../core/helpers/http/http_codes";

const repository = new Repository({ user_repo: true, institution_repo: true })

const usecase = new GetInstitutionUsecase(repository.InstitutionRepo, repository.UserRepo);
const controller = new GetInstitutionController(usecase);

export const handler = async (event: any, context: any) => {
    let request = new HttpRequest(event);
    let response = await controller.execute(request);
    return response.to_json();
}