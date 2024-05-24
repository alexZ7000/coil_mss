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
import { GetAllActivitiesCatalogUsecase } from "./get_all_activities_catalog_usecase";


export class GetAllActivitiesCatalogController {
  public usecase: GetAllActivitiesCatalogUsecase;

  constructor(usecase: GetAllActivitiesCatalogUsecase) {
    this.usecase = usecase;
  }

  public async execute(request: HttpRequest): Promise<HttpResponse> {
    try {
      if (!request) {
        throw new InvalidRequest();
      }
      
      const response = await this.usecase.execute();
      return new OK(response, "Activities found successfully");

    } catch (error: any) {
      return new InternalServerError(error.message);
    }
  }
}
