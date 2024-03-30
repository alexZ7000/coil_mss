import { UpdateUserUsecase } from "./update_user_usecase";
import { UpdateUserController } from "./update_user_controller";

import { Repository } from "../../../core/repositories/Repository";
import { HttpRequest } from "../../../core/helpers/http/http_codes";

const repository = new Repository({ user_repo: true });

const usecase = new UpdateUserUsecase(repository.UserRepo);
const controller = new UpdateUserController(usecase);

export const handler = async (event: any, context: any) => {
  let request = new HttpRequest(event);
  let response = await controller.execute(request);

  return response.to_json();
};
