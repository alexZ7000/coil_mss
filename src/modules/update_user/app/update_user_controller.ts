import { request } from "http";
import { UpdateUserUsecase } from "./update_user_usecase";
import {
  ConflictError,
  InvalidParameter,
  InvalidRequest,
  MissingParameter,
  UserNotAuthenticated,
} from "../../../core/helpers/errors/ModuleError";
import {
  BadRequest,
  Conflict,
  HttpRequest,
  InternalServerError,
  OK,
  ParameterError,
  Unauthorized,
} from "../../../core/helpers/http/http_codes";
import { EntityError } from "../../../core/helpers/errors/EntityError";

export class UpdateUserController {
  public usecase: UpdateUserUsecase;

  constructor(usecase: UpdateUserUsecase) {
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

      const updatedUser = await this.usecase.execute(request.headers, request.body.body);
      return new OK(updatedUser.to_json(), "User updated successfully.");
    } catch (error) {
      if (error instanceof InvalidRequest) {
        return new BadRequest(error.message);
      }
      if (error instanceof UserNotAuthenticated) {
        return new Unauthorized(error.message);
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
