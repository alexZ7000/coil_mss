import { Repository } from "../../../core/repositories/Repository";
import { HttpRequest } from "../../../core/helpers/http/http_codes";
import { GetActivityRequirementsUsecase } from "./get_activity_requirements_usecase";
import { GetActivityRequirementsController } from "./get_activity_requirements_controller";

const repository = new Repository({ user_repo: true, institution_repo: true, language_repo: true, course_repo: true, criteria_repo: true });

const usecase = new GetActivityRequirementsUsecase(repository.UserRepo, repository.InstitutionRepo, repository.CourseRepo, repository.CriteriaRepo, repository.LanguageRepo);

const controller = new GetActivityRequirementsController(usecase);

export const handler = async (event: any, context: any) => {
  let request = new HttpRequest(event);
  let response = await controller.execute(request);
  return response.to_json();
}
