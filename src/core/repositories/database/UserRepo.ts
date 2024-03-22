import { User } from "../../structure/entities/User";
import { IUserRepo } from "../interfaces/IUserRepo";

export class UserRepo implements IUserRepo {
  public get_user(id: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }

  public get_user_by_email(email: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }

  public create_user(user: User): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  public update_user(
    userId: string,
    course: string,
    semester_course: number
  ): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
}
