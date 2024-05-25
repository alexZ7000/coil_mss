import { IUserRepo } from "../interfaces/IUserRepo";
import { User } from "../../structure/entities/User";
import { UserMock } from "../../structure/mocks/UserMock";
import { UserTypeEnum } from "../../helpers/enums/UserTypeEnum";

export class UserRepoMock implements IUserRepo {
  public user_mock: UserMock;

  constructor() {
    this.user_mock = new UserMock();
  }

  public get_user(id: string): Promise<User | null> {
    return new Promise((resolve, reject) => {
      const user = this.user_mock.users.find((user) => user.id === id);
      resolve(user || null);
    });
  }

  public create_user(user: User): Promise<boolean> {
    this.user_mock.users.push(user);
    return Promise.resolve(true);
  }

  public update_user(updatedUser: User): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const userIndex = this.user_mock.users.findIndex((user) => user.id === updatedUser.id);
      this.user_mock.users[userIndex] = updatedUser;
      resolve(true);
    });
  }

  public get_user_by_email(email: string): Promise<User | null> {
    return new Promise((resolve, reject) => {
      const user = this.user_mock.users.find((user) => user.email === email);
      resolve(user || null);
    });
  }

  public get_all_moderators(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      const moderators = this.user_mock.users.filter((user) => user.user_type === UserTypeEnum.MODERATOR);
      resolve(moderators);
    });
  }
}