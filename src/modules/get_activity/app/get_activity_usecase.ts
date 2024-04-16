import {
  InvalidRequest,
  MissingParameter,
  UserNotAuthenticated,
} from "../../../core/helpers/errors/ModuleError";
import { TokenAuth } from "../../../core/helpers/functions/token_auth";
import { NotFound } from "../../../core/helpers/http/http_codes";
import { IActivityRepo } from "../../../core/repositories/interfaces/IActivityRepo";
import { IUserRepo } from "../../../core/repositories/interfaces/IUserRepo";

export class GetActivityUsecase {
  public token_auth: TokenAuth;
  public user_repo: IUserRepo;
  public activity_repo: IActivityRepo;

  constructor(user_repo: IUserRepo, activity_repo: IActivityRepo) {
    this.token_auth = new TokenAuth();
    this.user_repo = user_repo;
    this.activity_repo = activity_repo;
  }

  async execute(headers: { [key: string]: any }, body: { [key: string]: any }) {
    if (!headers) {
      throw new InvalidRequest("Headers");
    }
    if (!headers.Authorization) {
      throw new MissingParameter("Authorization");
    }
    if (!body) {
      throw new InvalidRequest("Body");
    }
    if (!body.activity_id) {
      throw new MissingParameter("activity_id");
    }

    const user_student_id = await this.token_auth
      .decode_token(headers.Authorization)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw new UserNotAuthenticated("Invalid or expired token");
      });

    const user_student = await this.user_repo.get_user(user_student_id);
    if (!user_student) {
      throw new UserNotAuthenticated();
    }

    const activity = await this.activity_repo.get_activity(body.activity_id);
    if (!activity) {
      throw new NotFound("Activity not found");
    }

    return activity.to_json();
  }
}
