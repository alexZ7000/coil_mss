import {
  InvalidRequest,
  MissingParameter,
  UserNotAuthenticated,
} from "../../../core/helpers/errors/ModuleError";
import { NotFoundError } from "../../../core/helpers/errors/RepoError";
import {
  BadRequest,
  Deleted,
  HttpRequest,
  HttpResponse,
  InternalServerError,
  NotFound,
  OK,
  Unauthorized,
} from "../../../core/helpers/http/http_codes";
import { DeleteModeratorUsecase } from "./delete_moderator_usecase";

export class DeleteModeratorController {
  public usecase: DeleteModeratorUsecase;

  constructor(usecase: DeleteModeratorUsecase) {
    this.usecase = usecase;
  }

  public async execute(request: HttpRequest): Promise<HttpResponse> {
    try {
      if (!request) {
        throw new InvalidRequest();
      }
      if (!request.headers) {
        throw new InvalidRequest("Headers");
      }

      const queryParams = request.body.queryStringParameters;

      let response = await this.usecase.execute(request.headers, queryParams);
      return new Deleted(response, "Moderator deleted successfully");
    } catch (error: any) {
      if (error instanceof InvalidRequest) {
        return new BadRequest(error.message);
      }
      if (error instanceof UserNotAuthenticated) {
        return new Unauthorized(error.message);
      }
      if (error instanceof MissingParameter) {
        return new NotFound(error.message);
      }
      if (error instanceof NotFoundError) {
        return new NotFound(error.message);
      }
      return new InternalServerError(error.message);
    }
  }
}
