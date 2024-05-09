import { HttpRequest } from "../../../core/helpers/http/http_codes";
import { GetAllActivitiesEnrolledController } from "./get_all_activities_enrolled_controller";
import { GetAllActivitiesEnrolledUsecase } from "./get_all_activities_enrolled_usecase";
import { Repository } from "../../../core/repositories/Repository";

const repository = new Repository({ user_repo: true, activity_repo: true });

const usecase = new GetAllActivitiesEnrolledUsecase(
  repository.UserRepo,
  repository.ActivityRepo
);
const controller = new GetAllActivitiesEnrolledController(usecase);

export const handler = async (event: any, context: any) => {
  let request = new HttpRequest(event);
  let response = await controller.execute(request);
  return response.to_json();
};
