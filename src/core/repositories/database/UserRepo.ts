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

  public async update_user(
    userId: string,
    course: string,
    semester_course: number
  ): Promise<User> {
    try {

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          courseId: Number(course), 
          semesterCourse: semester_course,
          updatedAt: new Date(), 
        },
      })

    const userConvert = new User({
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        user_type: updatedUser.userTypeId as unknown as UserTypeEnum,
        course: updatedUser.courseId ? updatedUser.courseId.toString() : null,
        semester_course: updatedUser.semesterCourse,
        created_at: updatedUser.createdAt,
        updated_at: updatedUser.updatedAt,
    });

    return userConvert;
      
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      throw error;
    }
  }
}
