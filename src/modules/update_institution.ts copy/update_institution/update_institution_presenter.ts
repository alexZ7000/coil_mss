import { UpdateInstitutionUsecase } from "./update_institution_usecase";
import { UpdateInstitutionController } from "./update_institution_controller";

import { Repository } from "../../../core/repositories/Repository";
import { HttpRequest } from "../../../core/helpers/http/http_codes";

const repository = new Repository({ user_repo: true });

const usecase = new UpdateInstitutionUsecase(repository.InstitutionRepo, repository.UserRepo);
const controller = new UpdateInstitutionController(usecase);

export const handler = async (event: any, context: any) => {
  let request = new HttpRequest(event);
  let response = await controller.execute(request);

  return response.to_json();
};
