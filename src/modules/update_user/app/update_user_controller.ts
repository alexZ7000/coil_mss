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
  InternalServerError,
  ParameterError,
  Unauthorized,
} from "../../../core/helpers/http/http_codes";
import { EntityError } from "../../../core/helpers/errors/EntityError";

export class UpdateUserController {
  public usecase: UpdateUserUsecase;

  constructor(usecase: UpdateUserUsecase) {
    this.usecase = usecase;
  }

  public async handle(
    headers: { [key: string]: string },
    body: { [key: string]: any }
  ) {
    try {
      if (!headers || !headers.Authorization) {
        throw new Error("Missing Authorization header");
      }
      if (!request) {
        throw new InvalidRequest();
      }
      if (!body) {
        throw new InvalidRequest("Body");
      }
      if (!body.id) {
        throw new InvalidRequest("Id");
      }
      if (!body.course) {
        throw new InvalidRequest("Course");
      }
      if (!body.semester_course) {
        throw new InvalidRequest("Semester");
      }

      const updatedUser = await this.usecase.execute(headers, body);
      return updatedUser;

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
