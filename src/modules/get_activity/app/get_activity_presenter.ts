import { HttpRequest } from "../../../core/helpers/http/http_codes";
import { GetActivityController } from "./get_activity_controller";
import { GetActivityUsecase } from "./get_activity_usecase";
import { Repository } from "../../../core/repositories/Repository";

const repository = new Repository({ activity_repo: true });

const usecase = new GetActivityUsecase(repository.ActivityRepo);
const controller = new GetActivityController(usecase);

export const handler = async (event: any, context: any) => {
  try {
    const request = new HttpRequest(event);

    const response = await controller.execute(request);

    return {
      statusCode: response.statusCode,
      body: JSON.stringify(response.body),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};
