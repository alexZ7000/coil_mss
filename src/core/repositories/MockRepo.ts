import { User } from "../structure/entities/User";
import { UserMock } from "../structure/mocks/UserMock";
import { DatabaseInterface } from "./Interfaces/DatabaseInterface";

export class MockRepo implements DatabaseInterface {
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

public update_user(
    userId: string,
    course: string,
    semester_course: number
): Promise<User | null> {
    return new Promise((resolve, reject) => {
        const userIndex = this.user_mock.users.findIndex(
            (user) => user.id === userId
        );
        if (userIndex === -1) {
            resolve(null); 
        } else {
            this.user_mock.users[userIndex].course = course;
            this.user_mock.users[userIndex].semester_course = semester_course;

            resolve(this.user_mock.users[userIndex]);
        }
    });
}

  public get_user_by_email(email: string): Promise<User | null> {
    return new Promise((resolve, reject) => {
      const user = this.user_mock.users.find((user) => user.email === email);
      resolve(user || null);
    });
  }
}
