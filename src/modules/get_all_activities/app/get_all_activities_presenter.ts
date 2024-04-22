import { HttpRequest } from "../../../core/helpers/http/http_codes";
import { GetAllActivitiesByStatusController } from "./get_all_activities_controller";
import { GetAllActivitiesByStatusUsecase } from "./get_all_activities_usecase";
import { Repository } from "../../../core/repositories/Repository";

const repository = new Repository({ activity_repo: true });

const usecase = new GetAllActivitiesByStatusUsecase(
  repository.UserRepo,
  repository.ActivityRepo
);
const controller = new GetAllActivitiesByStatusController(usecase);

export const handler = async (event: any, context: any) => {
  let request = new HttpRequest(event);
  let response = await controller.execute(request);
  return response.to_json();
};
