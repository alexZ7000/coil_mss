import { EntityError } from "../../helpers/errors/EntityError";
import { UserTypeEnum } from "../../helpers/enums/UserTypeEnum";


class UserProps {
  id: string;
  name: string | null;
  email: string;
  user_type: UserTypeEnum;
  created_at: Date;
  updated_at: Date;
}

export class User {
  id: string;
  name: string | null;
  email: string;
  user_type: UserTypeEnum;
  created_at: Date;
  updated_at: Date;

  constructor(props: UserProps) {
    this.id = this.validate_set_id(props.id);
    this.name = this.validate_set_name(props.name, props.user_type);
    this.email = this.validate_set_email(props.email);
    this.user_type = this.validate_set_user_type(props.user_type);
    this.created_at = this.validate_set_created_at(props.created_at);
    this.updated_at = this.validate_set_updated_at(props.updated_at);
  }

  public to_json() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      user_type: this.user_type,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }

  private validate_set_id(id: string) {
    if (id == null || id == "") {
      throw new EntityError("Parameter id is required");
    }
    if (typeof id !== "string") {
      throw new EntityError("Parameter id is not a string");
    }
    if (id.length != 36) {
      throw new EntityError("Parameter id is not a valid UUID");
    }
    return id;
  }

  private validate_set_name(name: string | null, user_type: UserTypeEnum) {
    if (user_type == UserTypeEnum.MODERATOR && name == null) {
      return null;
    } else if (
      user_type != UserTypeEnum.MODERATOR &&
      (name == null || name == "")
    ) {
      throw new EntityError("Parameter name is required");
    }
    if (typeof name !== "string") {
      throw new EntityError("Parameter name is not a string");
    }
    return name;
  }

  private validate_set_email(email: string) {
    if (email == null || email == "") {
      throw new EntityError("Parameter email is required");
    }
    if (typeof email !== "string") {
      throw new EntityError("Parameter email is not a string");
    }
    let padrao: RegExp = /^[a-zA-Z0-9._%+-]+@maua\.br$/;
    if (!padrao.test(email)) {
      throw new EntityError("Invalid Email, must be a maua.br domain");
    }
    return email;
  }

  private validate_set_user_type(user_type: UserTypeEnum) {
    if (user_type == null) {
      throw new EntityError("Parameter user_type is required");
    }
    if (!(user_type in UserTypeEnum)) {
      throw new EntityError("Parameter user_type is not a UserTypeEnum");
    }
    return user_type;
  }

  private validate_set_created_at(created_at: Date) {
    if (created_at == null) {
      throw new EntityError("Parameter created_at is required");
    }
    if (typeof created_at !== "object") {
      throw new EntityError("Parameter created_at is not a Date");
    }
    return created_at;
  }

  private validate_set_updated_at(updated_at: Date) {
    if (updated_at == null) {
      throw new EntityError("Parameter updated_at is required");
    }
    if (typeof updated_at !== "object") {
      throw new EntityError("Parameter updated_at is not a Date");
    }
    return updated_at;
  }
}
