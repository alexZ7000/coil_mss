import {
  InvalidParameter,
  InvalidRequest,
  MissingParameter,
  NotfoundError,
  UserNotAllowed,
  UserNotAuthenticated,
} from "../../../core/helpers/errors/ModuleError";
import { NotFoundError } from "../../../core/helpers/errors/RepoError";
import {
  BadRequest,
  Forbidden,
  HttpRequest,
  HttpResponse,
  InternalServerError,
  NotFound,
  OK,
  ParameterError,
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
      if (!request.body) {
        throw new MissingParameter("Body");
      }

      const body = request.body.body;

      let response = await this.usecase.execute(request.headers, body);
      return new OK(response, "Moderator deleted successfully");
    } catch (error: any) {
      if (error instanceof InvalidRequest) {
        return new BadRequest(error.message);
      }
      if (error instanceof InvalidParameter) {
        return new ParameterError(error.message);
      }
      if (error instanceof UserNotAuthenticated) {
        return new Unauthorized(error.message);
      }
      if( error instanceof UserNotAllowed) {
        return new Forbidden(error.message);
      }
      if (error instanceof MissingParameter) {
        return new ParameterError(error.message);
      }
      if (error instanceof NotfoundError) {
        return new NotFound(error.message);
      }
      return new InternalServerError(error.message);
    }
  }
}
