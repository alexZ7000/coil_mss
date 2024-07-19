import { User } from "../../structure/entities/User";

export interface IUserRepo {
  create_user(user: User): Promise<boolean>;
  update_user(user: User): Promise<boolean>;
  get_user(id: string): Promise<User | null>;
  get_user_by_email(email: string): Promise<User | null>;
  get_all_moderators(): Promise<User[]>;
  delete_moderator(id: string): Promise<boolean>;
}
