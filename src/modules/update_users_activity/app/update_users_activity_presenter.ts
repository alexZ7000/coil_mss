import { UpdateUsersActivityUsecase } from "./update_users_activity_usecase";
import { UpdateUsersActivityController } from "./update_users_activity_controller";

import { Repository } from "../../../core/repositories/Repository";
import { HttpRequest } from "../../../core/helpers/http/http_codes";

const repository = new Repository({ user_repo: true, activity_repo: true });

const usecase = new UpdateUsersActivityUsecase(repository.UserRepo, repository.ActivityRepo);
const controller = new UpdateUsersActivityController(usecase);

export const handler = async (event: any, context: any) => {
  let request = new HttpRequest(event);
  let response = await controller.execute(request);

  return response.to_json();
};
