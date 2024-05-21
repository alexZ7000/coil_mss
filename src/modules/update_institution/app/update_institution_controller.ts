// import { request } from "http";
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
import { UpdateInstitutionUsecase } from "./update_institution_usecase";

export class UpdateInstitutionController {
  public usecase: UpdateInstitutionUsecase;

  constructor(usecase: UpdateInstitutionUsecase) {
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

      await this.usecase.execute(request.headers, request.body.body);
      return new OK({}, "Institution updated successfully");
    }
    catch (error: any) {
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