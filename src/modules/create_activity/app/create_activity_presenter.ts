import { CreateActivityUsecase } from "./create_activity_usecase";
import { CreateActivityController } from "./create_activity_controller";

import { Repository } from "../../../core/repositories/Repository";
import { HttpRequest } from "../../../core/helpers/http/http_codes";

const repository = new Repository({ user_repo: true, activity_repo: true, institution_repo: true, course_repo: true });

const usecase = new CreateActivityUsecase(
  repository.UserRepo,
  repository.ActivityRepo
);
const controller = new CreateActivityController(usecase);

export const handler = async (event: any, context: any) => {
  let request = new HttpRequest(event);
  let response = await controller.execute(request);

  return response.to_json();
};
