import { Repository } from "../../../core/repositories/Repository";
import { HttpRequest } from "../../../core/helpers/http/http_codes";
import { GetCatalogUsecase } from "./get_catalog_usecase";
import { GetCatalogController } from "./get_catalog_controller";

const repository = new Repository({ activity_repo: true, institution_repo: true });

const usecase = new GetCatalogUsecase(
  repository.ActivityRepo,
  repository.InstitutionRepo
);
const controller = new GetCatalogController(usecase);

export const handler = async (event: any, context: any) => {
  let request = new HttpRequest(event);
  let response = await controller.execute(request);
  return response.to_json();
};
