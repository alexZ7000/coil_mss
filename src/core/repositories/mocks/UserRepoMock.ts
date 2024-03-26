import { User } from "../../structure/entities/User";
import { IUserRepo } from "../interfaces/IUserRepo";
import { UserMock } from "../../structure/mocks/UserMock";

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

  public update_user(updatedUser: User): Promise<User> {
    return new Promise((resolve, reject) => {
      const user_index = this.user_mock.users.findIndex(
        (user) => user.id === updatedUser.id
      );
      if (user_index === -1) {
        reject(new Error("User not found"));
        return;
      }

      this.user_mock.users[user_index] = updatedUser;
      resolve(updatedUser);
    });
  }

  public get_user_by_email(email: string): Promise<User | null> {
    return new Promise((resolve, reject) => {
      const user = this.user_mock.users.find((user) => user.email === email);
      resolve(user || null);
    });
  }
}
