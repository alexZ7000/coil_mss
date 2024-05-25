import { GetAllModeratorsUsecase } from "./get_all_moderators_usecase";
import { GetAllModeratorsController } from "./get_all_moderators_controller";

import { Repository } from "../../../core/repositories/Repository";
import { HttpRequest } from "../../../core/helpers/http/http_codes";

const repository = new Repository({ user_repo: true });

const usecase = new GetAllModeratorsUsecase(repository.UserRepo);
const controller = new GetAllModeratorsController(usecase);


export const handler = async (event: any, context: any) => {
    let request = new HttpRequest(event);
    let response = await controller.execute(request);
    return response.to_json();
}
