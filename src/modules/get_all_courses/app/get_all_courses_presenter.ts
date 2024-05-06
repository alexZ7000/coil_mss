import { Repository } from "../../../core/repositories/Repository";
import { HttpRequest } from "../../../core/helpers/http/http_codes";
import { GetAllCoursesUsecase } from "./get_all_courses_usecase";
import { GetAllCoursesController } from "./get_all_courses_controller";

const repository = new Repository({ course_repo: true, user_repo: true});

const usecase = new GetAllCoursesUsecase( repository.UserRepo, repository.CourseRepo);

const controller = new GetAllCoursesController(usecase);

export const handler = async (event: any, context: any) => {
  let request = new HttpRequest(event);
  let response = await controller.execute(request);
  return response.to_json();
}
