import { AssignUserUsecase } from "./assign_user_usecase";
import { AssignUserController } from "./assign_user_controller";

import { Repository } from "../../../core/repositories/Repository";
import { HttpRequest } from "../../../core/helpers/http/http_codes";

const repository = new Repository({ user_repo: true, activity_repo: true });

const usecase = new AssignUserUsecase(repository.UserRepo, repository.ActivityRepo);
const controller = new AssignUserController(usecase);


export const handler = async (event: any, context: any) => {
  let request = new HttpRequest(event);
  let response = await controller.execute(request);

  return response.to_json();
};
