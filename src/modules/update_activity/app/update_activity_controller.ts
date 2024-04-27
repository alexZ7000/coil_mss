import { UpdateActivityUsecase } from "./update_activity_usecase";
import {
  InvalidParameter,
  InvalidRequest,
  MissingParameter,
  NotfoundError,
  UserNotAllowed,
  UserNotAuthenticated,
} from "../../../core/helpers/errors/ModuleError";
import {
  BadRequest,
  Forbidden,
  HttpRequest,
  InternalServerError,
  NotFound,
  OK,
  ParameterError,
  Unauthorized,
  Unprocessable_Entity,
} from "../../../core/helpers/http/http_codes";
import { EntityError } from "../../../core/helpers/errors/EntityError";
import { UniqueConstraintError } from "sequelize";

export class UpdateActivityController {
  public usecase: UpdateActivityUsecase;

  constructor(usecase: UpdateActivityUsecase) {
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
      return new OK({}, "Activity updated successfully");
    } catch (error) {
      if (error instanceof InvalidRequest) {
        return new BadRequest(error.message);
      }
      if (error instanceof UniqueConstraintError) {
        return new Unprocessable_Entity(error.message);
      }
      if (error instanceof UserNotAuthenticated) {
        return new Unauthorized(error.message);
      }
      if (error instanceof UserNotAllowed) {
        return new Forbidden(error.message);
      }
      if (error instanceof NotfoundError) {
        return new NotFound(error.message);
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
