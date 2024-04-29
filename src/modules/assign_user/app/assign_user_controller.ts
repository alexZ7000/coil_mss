import { AssignUserUsecase } from "./assign_user_usecase";
import {
  ConflictError,
  InvalidParameter,
  InvalidRequest,
  MissingParameter,
  UserNotAllowed,
  UserNotAuthenticated,
} from "../../../core/helpers/errors/ModuleError";
import {
  BadRequest,
  Conflict,
  Forbidden,
  HttpRequest,
  InternalServerError,
  OK,
  ParameterError,
  Unauthorized,
} from "../../../core/helpers/http/http_codes";
import { EntityError } from "../../../core/helpers/errors/EntityError";


export class AssignUserController {
  public usecase: AssignUserUsecase;

  constructor(usecase: AssignUserUsecase) {
    this.usecase = usecase;
  }

  public async execute(request: HttpRequest) {
    try {
      if (!request) {
        throw new InvalidRequest();
      }

      if (!request.headers) {
        throw new InvalidRequest("Headers");
      }

      if (!request.body) {
        throw new InvalidRequest("Body");
      }

      const usecase = await this.usecase.execute(request.headers, request.body.queryStringParameters);
      let message: string = usecase.assign ? "User assigned successfully" : "User unassigned successfully";
      return new OK({}, message);
    } catch (error) {
      if (error instanceof InvalidRequest) {
        return new BadRequest(error.message);
      }
      if (error instanceof UserNotAuthenticated) {
        return new Unauthorized(error.message);
      }
      if (error instanceof UserNotAllowed) {
        return new Forbidden(error.message);
      }
      if (error instanceof ConflictError) {
        return new Conflict(error.message);
      }
      if (error instanceof EntityError) {
        return new ParameterError(error.message);
      }
      if (error instanceof InvalidParameter) {
        return new ParameterError(error.message);
      }
      if (error instanceof MissingParameter) {
        return new ParameterError(error.message);
      }
      return new InternalServerError(error.message);
    }
  }
}
