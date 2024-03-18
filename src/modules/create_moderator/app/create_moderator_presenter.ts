import { CreateModeratorUsecase } from "./create_moderator_usecase";
import { CreateModeratorController } from "./create_moderator_controller";

import { MockRepo } from "../../../core/repositories/MockRepo";
import { HttpRequest } from "../../../core/helpers/http/http_codes";
import { DatabaseRepo } from "../../../core/repositories/DatabaseRepo";
import { DatabaseInterface } from "../../../core/repositories/Interfaces/DatabaseInterface";


const stage = process.env.STAGE || 'test';
var database_repo: DatabaseInterface;

if (stage === 'test') {
    database_repo = new MockRepo();
} else {
    database_repo = new DatabaseRepo();
}

const usecase = new CreateModeratorUsecase(database_repo);
const controller = new CreateModeratorController(usecase);

export const handler = async (event: any, context: any) => {
    let request = new HttpRequest(event);
    let response  = await controller.execute(request);
    return response.to_format();
}