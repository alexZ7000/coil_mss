import { PrismaClient, User } from "@prisma/client";
import { DatabaseInterface } from "./Interfaces/DatabaseInterface";
import { InternalServerError } from "../helpers/http/http_codes";

export class DatabaseRepo implements DatabaseInterface {
  protected prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  
  public get_user(id: string) {
    let user = this.prisma.user.findUnique({
      where: {
        id: id
      }
    });

    this.close();
    return user;
  }

  private async close() {
    await this.prisma.$disconnect().catch((error) => {
      throw new InternalServerError(error);
    });
  }
}