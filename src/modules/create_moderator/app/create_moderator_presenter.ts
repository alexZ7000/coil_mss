import { CreateModeratorUsecase } from "./create_moderator_usecase";
import { CreateModeratorController } from "./create_moderator_controller";

import { Repository } from "../../../core/repositories/Repository";
import { HttpRequest } from "../../../core/helpers/http/http_codes";

const repository = new Repository({user_repo: true});

const usecase = new CreateModeratorUsecase(repository.UserRepo);
const controller = new CreateModeratorController(usecase);


export const handler = async (event: any, context: any) => {
    let request = new HttpRequest(event);
    let response  = await controller.execute(request);
    return response.to_json();
}