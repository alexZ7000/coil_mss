import {
  MissingParameter,
  UserNotAuthenticated,
} from "../../../core/helpers/errors/ModuleError";
import { TokenAuth } from "../../../core/helpers/functions/token_auth";
import { DatabaseInterface } from "../../../core/repositories/Interfaces/DatabaseInterface";
import { UserTypeEnum } from "../../../core/helpers/enums/UserTypeEnum";

export class UpdateUserUsecase {
  public token_auth: TokenAuth;
  public database_repo: DatabaseInterface;

  constructor(database_repo: DatabaseInterface) {
    this.token_auth = new TokenAuth();
    this.database_repo = database_repo;
  }

  public async execute(
    headers: { [key: string]: any },
    body: { [key: string]: any }
  ) {
    if (!headers) {
      throw new MissingParameter("Headers");
    }
    if (!body) {
      throw new MissingParameter("Body");
    }
    if (!headers.Authorization) {
      throw new MissingParameter("Authorization");
    }
    if (!body.semester_course) {
      throw new MissingParameter("Semester");
    }
    if (!body.course) {
      throw new MissingParameter("Course");
    }

    const user_student_id = await this.token_auth
      .decode_token(headers.Authorization)
      .then((response) => {
        return response.sub;
      })
      .catch((error) => {
        throw new UserNotAuthenticated("Invalid or expired token.");
      });

    const user_student = await this.database_repo.get_user(
      user_student_id.toString()
    );
    if (!user_student) {
      throw new UserNotAuthenticated("User not found.");
    }
    if (user_student.user_type !== UserTypeEnum.STUDENT) {
      throw new UserNotAuthenticated("User is not a student.");
    }

    const user = await this.database_repo.get_user(body.id);
    if (!user) {
      throw new UserNotAuthenticated("User not found.");
    }

    const updatedUser = await this.database_repo.update_user(
      body.userId,
      body.course,
      body.semester_course
    );

    return updatedUser;
  }
}
