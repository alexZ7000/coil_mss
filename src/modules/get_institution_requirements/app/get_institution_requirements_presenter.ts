import { Repository } from "../../../core/repositories/Repository";
import { HttpRequest } from "../../../core/helpers/http/http_codes";
import { GetInstitutionRequirementsUsecase } from "./get_institution_requirements_usecase";
import { GetInstitutionRequirementsController } from "./get_institution_requirements_controller";

const repository = new Repository({ user_repo: true, country_repo: true, social_media_repo: true });

const usecase = new GetInstitutionRequirementsUsecase(repository.UserRepo, repository.CountryRepo, repository.SocialMediaRepo);

const controller = new GetInstitutionRequirementsController(usecase);

export const handler = async (event: any, context: any) => {
  let request = new HttpRequest(event);
  let response = await controller.execute(request);
  return response.to_json();
}
