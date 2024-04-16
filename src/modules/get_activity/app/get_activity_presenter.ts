import { HttpRequest } from "../../../core/helpers/http/http_codes";
import { GetActivityController } from "./get_activity_controller";
import { GetActivityUsecase } from "./get_activity_usecase";
import { Repository } from "../../../core/repositories/Repository";

const repository = new Repository({ activity_repo: true });

const usecase = new GetActivityUsecase(repository.UserRepo, repository.ActivityRepo);
const controller = new GetActivityController(usecase);

export const handler = async (event: any, context: any) => {
  
};
