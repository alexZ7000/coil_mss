import { Repository } from "../../../core/repositories/Repository";
import { HttpRequest } from "../../../core/helpers/http/http_codes";
import { GetAllActivitiesCatalogUsecase } from "./get_all_activities_catalog_usecase";
import { GetAllActivitiesCatalogController } from "./get_all_activities_catalog_controller";

const repository = new Repository({ user_repo: true, activity_repo: true });

const usecase = new GetAllActivitiesCatalogUsecase(
  repository.ActivityRepo
);
const controller = new GetAllActivitiesCatalogController(usecase);

export const handler = async (event: any, context: any) => {
  let request = new HttpRequest(event);
  let response = await controller.execute(request);
  return response.to_json();
};
