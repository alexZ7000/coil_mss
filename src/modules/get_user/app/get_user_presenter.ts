import { HttpRequest } from "../../../core/helpers/http/http_codes";
import { Repository } from "../../../core/repositories/Repository";
import { GetUserController } from "./get_user_controller";
import { GetUserUsecase } from "./get_user_usecase";

const repository = new Repository({ user_repo: true });

const usecase = new GetUserUsecase(repository.UserRepo);
const controller = new GetUserController(usecase);


export const handler = async (event: any, context: any) => {
  let request = new HttpRequest(event);
  let response = await controller.execute(request);
  return response.to_json();
};
