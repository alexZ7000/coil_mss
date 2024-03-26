import { IUserRepo } from "../interfaces/IUserRepo";
import { User } from "../../structure/entities/User";
import { PrismaClient } from "@prisma/client";
import { UserTypeEnum } from "../../helpers/enums/UserTypeEnum";

const prisma = new PrismaClient();

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

  public async update_user(updatedUser: User): Promise<User> {
    try {
      const prismaUser = await prisma.user.update({
        where: { id: updatedUser.id },
        data: {
          courseId: updatedUser.course ? Number(updatedUser.course) : null,
          semesterCourse: updatedUser.semester_course,
          updatedAt: new Date(),
        },
      });

      return this.convertToUser(prismaUser);
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  private convertToUser(prismaUser: any): User {
    return new User({
      id: prismaUser.id,
      name: prismaUser.name,
      email: prismaUser.email,
      user_type: prismaUser.userTypeId as unknown as UserTypeEnum,
      course: prismaUser.courseId ? prismaUser.courseId.toString() : null,
      semester_course: prismaUser.semesterCourse,
      created_at: prismaUser.createdAt,
      updated_at: prismaUser.updatedAt,
    });
  }
}
