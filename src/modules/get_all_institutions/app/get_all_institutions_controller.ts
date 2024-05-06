import {
  HttpRequest,
  HttpResponse,
  OK,
  BadRequest,
  Unauthorized,
  ParameterError,
  InternalServerError,
} from "../../../core/helpers/http/http_codes";
import {
  InvalidRequest,
  MissingParameter,
  UserNotAuthenticated,
} from "../../../core/helpers/errors/ModuleError";
import { GetAllInstitutionsUsecase } from "./get_all_institutions_usecase";


export class GetAllInstitutionsController {
  public usecase: GetAllInstitutionsUsecase;

  constructor(usecase: GetAllInstitutionsUsecase) {
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

      const response = await this.usecase.execute(request.headers);
      return new OK(response, "Activities found successfully");
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
