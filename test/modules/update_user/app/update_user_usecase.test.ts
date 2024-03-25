import { it, describe, expect } from "vitest";

import { UserMock } from "../../../../src/core/structure/mocks/UserMock";
import { TokenAuth } from "../../../../src/core/helpers/functions/token_auth";
import { UserRepoMock } from "../../../../src/core/repositories/mocks/UserRepoMock";
import { UpdateUserUsecase } from "../../../../src/modules/update_user/app/update_user_usecase";
import {
  MissingParameter,
  UserNotAuthenticated,
} from "../../../../src/core/helpers/errors/ModuleError";

describe("Testing Update User Usecase", () => {
  const user_student = new UserMock().users[1];
  const updatedUser = {
    id: user_student.id,
    course: "Updated Course",
    semester_course: 2,
  };

  it("should update a user", async () => {
    var token = (
      await new TokenAuth().generate_token(user_student.id)
    ).toString();
    const user_repo = new UserRepoMock();
    const update_user = new UpdateUserUsecase(user_repo);

    var response = await update_user.execute(
        {
            Authorization: token,
        },
        updatedUser
    );

    expect(response).not.toBeNull(); 

    expect(response!.id).toBe(updatedUser.id); 
    expect(response!.course).toBe(updatedUser.course); 
    expect(response!.semester_course).toBe(updatedUser.semester_course); 
  });

  it("should not update a user with invalid token", async () => {
    const user_repo = new UserRepoMock();
    const update_user = new UpdateUserUsecase(user_repo);

    expect(async () => {
      await update_user.execute(
        {
          Authorization: "invalid_token",
        },
        updatedUser
      );
    }).rejects.toThrow("Invalid or expired token.");
  });

  it("should not update a user with missing parameters", async () => {
    var token = (
      await new TokenAuth().generate_token(user_student.id)
    ).toString();
    const user_repo = new UserRepoMock();
    const update_user = new UpdateUserUsecase(user_repo);

    expect(async () => {
      await update_user.execute(
        {
          Authorization: token,
        },
        {
          id: updatedUser.id,
          course: "",
          semester_course: updatedUser.semester_course,
        }
      );
    }).rejects.toThrow("Missing parameter: Course");
  });

  it("should not update a user with invalid user type", async () => {
    const user_repo = new UserRepoMock();
    const update_user = new UpdateUserUsecase(user_repo);

    expect(async () => {
      await update_user.execute(
        {
          Authorization: "invalid_token", 
        },
        updatedUser
      );
    }).rejects.toThrow("Invalid or expired token.");
  });

  it("should not update a user with invalid user type", async () => {
    var token = (
      await new TokenAuth().generate_token('5126873490124')
    ).toString();
    const user_repo = new UserRepoMock();
    const update_user = new UpdateUserUsecase(user_repo);

    expect(async () => {
      await update_user.execute(
        {
          Authorization: token,
        },
        {
          course: updatedUser.course,
          semester_course: updatedUser.semester_course,
        }
      );
    }).rejects.toThrow("User not found.");
  });
});
