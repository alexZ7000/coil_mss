import { UserDTO } from "../dtos/UserDTO";
import { IUserRepo } from "../../interfaces/IUserRepo";
import { User } from "../../../structure/entities/User";
import { User as UserDB, UserType as UserTypeDB } from "../models/Models";
import { UserTypeEnum } from "../../../helpers/enums/UserTypeEnum";

export class UserRepo implements IUserRepo {
  private user_dto: UserDTO = new UserDTO();

  public async get_user(id: string): Promise<User | null> {
    let user_found = await UserDB.findOne({
      where: {
        id: id,
      },
      include: [
        { model: UserTypeDB, as: 'user_type' }
      ]
    });

    if (!user_found) {
      return null;
    }

    return this.user_dto.to_entity(user_found.toJSON());
  }

  public async get_user_by_email(email: string): Promise<User | null> {
    let user_found = await UserDB.findOne({
      where: {
        email: email,
      },
      include: [
        { model: UserTypeDB, as: 'user_type' }
      ],
    });

    if (!user_found) {
      return null;
    }

    return this.user_dto.to_entity(user_found.toJSON());
  }

  public async create_user(user: User): Promise<boolean> {
    let user_created = await UserDB.create({
      id: user.id,
      name: user.name,
      email: user.email,
      user_type_id: user.user_type,
      created_at: user.created_at,
      updated_at: user.updated_at,
    });

    return user_created ? true : false;
  }

  public async update_user(updatedUser: User): Promise<boolean> {
    let user_updated = await UserDB.update({
      name: updatedUser.name,
      email: updatedUser.email,
      user_type_id: updatedUser.user_type,
      updated_at: updatedUser.updated_at,
    }, {
      where: {
        id: updatedUser.id,
      },
      returning: true,
    });

    return user_updated ? true : false;
  }

  public async get_all_moderators(): Promise<User[]> {
    let moderators_found = await UserDB.findAll({
      where: {
        user_type_id: UserTypeEnum.MODERATOR,
      },
      include: [
        { model: UserTypeDB, as: 'user_type' }
      ]
    });

    return moderators_found.map((moderator) => this.user_dto.to_entity(moderator.toJSON()));
  }
}
