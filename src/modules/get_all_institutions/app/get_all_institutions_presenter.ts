import { Repository } from "../../../core/repositories/Repository";
import { HttpRequest } from "../../../core/helpers/http/http_codes";
import { GetAllInstitutionsUsecase } from "./get_all_institutions_usecase";
import { GetAllInstitutionsController } from "./get_all_institutions_controller";

const repository = new Repository({ user_repo: true, institution_repo: true });

const usecase = new GetAllInstitutionsUsecase(
  repository.UserRepo,
  repository.InstitutionRepo
);
const controller = new GetAllInstitutionsController(usecase);

export const handler = async (event: any, context: any) => {
  let request = new HttpRequest(event);
  let response = await controller.execute(request);
  return response.to_json();
};
