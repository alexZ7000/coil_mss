import {
  HttpRequest,
  HttpResponse,
  OK,
  InternalServerError,
} from "../../../core/helpers/http/http_codes";
import {
  InvalidRequest,
} from "../../../core/helpers/errors/ModuleError";
import { GetCatalogUsecase } from "./get_catalog_usecase";


export class GetCatalogController {
  public usecase: GetCatalogUsecase;

  constructor(usecase: GetCatalogUsecase) {
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
