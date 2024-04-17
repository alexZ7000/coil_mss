import { UniqueConstraintError } from "sequelize";

import { CreateActivityUsecase } from "./create_activity_usecase";
import { EntityError } from "../../../core/helpers/errors/EntityError";
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
  Created,
  Forbidden,
  HttpRequest,
  InternalServerError,
  ParameterError,
  Unauthorized,
  Unprocessable_Entity,
} from "../../../core/helpers/http/http_codes";


export class CreateActivityController {
  public usecase: CreateActivityUsecase;

  constructor(usecase: CreateActivityUsecase) {
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

      const usecase = await this.usecase.execute(request.headers, request.body.body);
      return new Created({}, "Activity created successfully");

    } catch (error) {
      if (error instanceof InvalidRequest) {
        return new BadRequest(error.message);
      }
      if (error instanceof UserNotAuthenticated) {
        return new Unauthorized(error.message);
      }
      if (error instanceof ConflictError) {
        return new Forbidden(error.message);
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
      if (error instanceof UniqueConstraintError) {
        return new Unprocessable_Entity(error.message);
      }
      return new InternalServerError(error.message);
    }
  }
}
