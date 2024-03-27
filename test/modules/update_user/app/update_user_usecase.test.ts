import { it, describe, expect } from "vitest";

import { UserMock } from "../../../../src/core/structure/mocks/UserMock";
import { TokenAuth } from "../../../../src/core/helpers/functions/token_auth";
import { UserRepoMock } from "../../../../src/core/repositories/mocks/UserRepoMock";
import { UpdateUserUsecase } from "../../../../src/modules/update_user/app/update_user_usecase";


describe("Testing Update User Usecase", () => {

  it("should update a user", async () => {
    const user_student = new UserMock().users[0];
    const update = {
      course: "Ciência da Computação",
      semester_course: "4",
    };

    var token = (
      await new TokenAuth().generate_token(user_student.id)
    ).toString();
    const user_repo = new UserRepoMock();
    const usecase = new UpdateUserUsecase(user_repo);

    var response = await usecase.execute(
        {
            Authorization: token,
        },
        update
    );

    expect(response).not.toBeNull(); 
    expect(response.id).toBe(user_student.id); 
    expect(response.course).toBe(update.course); 
    expect(response.semester_course).toBe(update.semester_course); 
  });

  it("should not update a user with invalid token", async () => {
    const user_student = new UserMock().users[0];
    const update = {
      course: "Ciência da Computação",
      semester_course: "4",
    };
    const user_repo = new UserRepoMock();
    const usecase = new UpdateUserUsecase(user_repo);

    expect(async () => {
      await usecase.execute(
        {
          Authorization: "invalid_token",
        },
        update
      );
    }).rejects.toThrow("Invalid or expired token");
  });

  it("should not update a user with missing parameters", async () => {
    const user_student = new UserMock().users[0];
    const update = {
      course: "Ciência da Computação",
      semester_course: "4",
    };
    var token = (
      await new TokenAuth().generate_token(user_student.id)
    ).toString();
    const user_repo = new UserRepoMock();
    const usecase = new UpdateUserUsecase(user_repo);

    expect(async () => {
      await usecase.execute(
        {
          Authorization: token,
        },
        {}
      );
    }).rejects.toThrow("Missing parameter: Course");
  });

  it("should not update a user with invalid user type", async () => {
    const update = {
      course: "Ciência da Computação",
      semester_course: "4",
    };
    const user_repo = new UserRepoMock();
    const usecase = new UpdateUserUsecase(user_repo);

    expect(async () => {
      await usecase.execute(
        {
          Authorization: "invalid_token", 
        },
        update
      );
    }).rejects.toThrow("Invalid or expired token");
  });

  it("should not update a user with invalid user type", async () => {
    const update = {
      course: "Ciência da Computação",
      semester_course: "4",
    };
    var token = (
      await new TokenAuth().generate_token('5126873490124')
    ).toString();
    const user_repo = new UserRepoMock();
    const usecase = new UpdateUserUsecase(user_repo);

    expect(async () => {
      await usecase.execute(
        {
          Authorization: token,
        },
        update
      );
    }).rejects.toThrow("User not authentificated");
  });
});
