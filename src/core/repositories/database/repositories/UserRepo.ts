import { PrismaClient } from "@prisma/client";

import { UserDTO } from "../dtos/UserDTO";
import { DatabaseMain } from "../DatabaseMain";
import { IUserRepo } from "../../interfaces/IUserRepo";
import { User } from "../../../structure/entities/User";


export class UserRepo implements IUserRepo {
  private client: PrismaClient;
  private user_dto: UserDTO = new UserDTO();

  constructor() {
    this.client = new DatabaseMain().rd_client;
  }

  public async get_user(id: string): Promise<User | null> {
    let user_found = await this.client.user.findUnique({
      where: {
        id: id,
      },
      include: {
        course: true,
        user_type: true,
      },
    });

    if (!user_found) {
      return null;
    }

    return this.user_dto.to_entity(user_found);
  }

  public async get_user_by_email(email: string): Promise<User | null> {
    let user_found = await this.client.user.findUnique({
      where: {
        email: email,
      },
      include: {
        course: true,
        user_type: true,
      },
    });

    if (!user_found) {
      return null;
    }

    return this.user_dto.to_entity(user_found);
  }

  public async create_user(user: User): Promise<boolean> {
    let user_to_create = this.user_dto.to_database(user);

    await this.client.user.create({
      data: user_to_create,
    }).then(() => {
      return true;
    }).catch(() => {
      return false;
    });
    return false;
  }

  public async update_user(updatedUser: User): Promise<User> {
    let user_to_update = this.user_dto.to_database(updatedUser);

    let user_updated = await this.client.user.update({
      where: {
        id: updatedUser.id,
      },
      data: user_to_update,
      include: {
        course: true,
        user_type: true,
      },
    });

    return this.user_dto.to_entity(user_updated);
  }
}
