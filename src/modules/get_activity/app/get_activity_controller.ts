import {
  InvalidRequest,
  MissingParameter,
  UserNotAuthenticated,
} from "../../../core/helpers/errors/ModuleError";
import {
  BadRequest,
  HttpRequest,
  HttpResponse,
  InternalServerError,
  OK,
  ParameterError,
  Unauthorized,
} from "../../../core/helpers/http/http_codes";
import { GetActivityUsecase } from "./get_activity_usecase";

export class GetActivityController {
  public usecase: GetActivityUsecase;

  constructor(usecase: GetActivityUsecase) {
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
        throw new InvalidRequest("Body");
      }

      const queryParams = request.body.queryStringParameters;

      const response = await this.usecase.execute(request.headers, queryParams);
      return new OK(response, "Activity found successfully");
    } catch (error) {
      if (error instanceof InvalidRequest) {
        return new BadRequest(error.message);
      }
      if (error instanceof UserNotAuthenticated) {
        return new Unauthorized(error.message);
      }
      if (error instanceof MissingParameter) {
        return new ParameterError(error.message);
      }
      return new InternalServerError(error.message);
    }
  }
}
