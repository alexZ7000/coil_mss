import {
  InvalidRequest,
  MissingParameter,
  NotfoundError,
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
  NotFound,
} from "../../../core/helpers/http/http_codes";
import { GetAllActivitiesEnrolledUsecase } from "./get_all_activities_enrolled_usecase";

export class GetAllActivitiesEnrolledController {
  public usecase: GetAllActivitiesEnrolledUsecase;

  constructor(usecase: GetAllActivitiesEnrolledUsecase) {
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

      const queryStringParams = request.body.queryStringParameters;

      const response = await this.usecase.execute(
        request.headers,
        queryStringParams
      );

      return new OK(response || {}, "Activities enrolled found successfully");
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
      if (error instanceof NotfoundError) {
        return new NotFound(error.message);
      }
      return new InternalServerError(error.message);
    }
  }
}
