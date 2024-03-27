import { PrismaClient } from "@prisma/client";

import { DatabaseMain } from "../DatabaseMain";
import { IUserRepo } from "../../interfaces/IUserRepo";
import { User } from "../../../structure/entities/User";

export class UserRepo implements IUserRepo {
  private client: PrismaClient;

  constructor() {
    this.client = new DatabaseMain().rd_client;
  }

  public async get_user(id: string): Promise<User | null> {
    let response = await this.client.user.findUnique({
      where: {
        id: id,
      },
    });
    let props = {
      id: response?.id,
      name: response?.name,
      email: response?.email,
      password: response?.password,
      user_type: response,


    }
    user: User = new User(response);
  }

  public get_user_by_email(email: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }

  public create_user(user: User): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  public async update_user(updatedUser: User): Promise<User> {
    throw new Error("Method not implemented.");
  }
}
