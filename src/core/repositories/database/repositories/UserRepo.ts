import { UserDTO } from "../dtos/UserDTO";
import { IUserRepo } from "../../interfaces/IUserRepo";
import { User } from "../../../structure/entities/User";
import { QueryError } from "../../../helpers/errors/RepoError";
import { User as UserDB, UserType as UserTypeDB, Course as CourseDB } from "../models/Models";

export class UserRepo implements IUserRepo {
  private user_dto: UserDTO = new UserDTO();

  public async get_user(id: string): Promise<User | null> {
    let user_found = await UserDB.findOne({
      where: {
        id: id,
      },
      include: {
        [UserTypeDB.name]: true,
        [CourseDB.name]: true,
      },
    });

    if (!user_found) {
      return null;
    }

    return this.user_dto.to_entity(user_found.toJSON());
  }

  public async get_user_by_email(email: string): Promise<User | null> {
    let user_found = await UserDB.findOne({
      where: {
        email: email,
      },
      include: {
        [UserTypeDB.name]: true,
        [CourseDB.name]: true,
      },
    });

    if (!user_found) {
      return null;
    }

    return this.user_dto.to_entity(user_found.toJSON());
  }

  public async create_user(user: User): Promise<boolean> {
    let user_created = await UserDB.create({
      id: user.id,
      name: user.name,
      email: user.email,
      user_type_id: user.user_type,
      course_id: user.course?.id,
      semester: user.semester_course,
      created_at: user.created_at,
      updated_at: user.updated_at,
    });

    return user_created ? true : false;
  }

  public async update_user(updatedUser: User): Promise<boolean> {
    let user_updated = await UserDB.update({
      name: updatedUser.name,
      email: updatedUser.email,
      user_type_id: updatedUser.user_type,
      course_id: updatedUser.course?.id,
      semester: updatedUser.semester_course,
      updated_at: updatedUser.updated_at,
    }, {
      where: {
        id: updatedUser.id,
      },
      returning: true,
    });

    return user_updated ? true : false;
  }
}
