import { it, describe, expect } from "vitest";
import { UserMock } from "../../../../src/core/structure/mocks/UserMock";
import { TokenAuth } from "../../../../src/core/helpers/functions/token_auth";
import { handler } from "../../../../src/modules/get_institution_requirements/app/get_institution_requirements_presenter";

describe("Testing Get Institution Requirements Presenter", () => {
  const user_admin = new UserMock().users[0];

  it("should get institution requirements for admin user", async () => {
    const token = await new TokenAuth().generate_token(user_admin.id);

    const response = await handler(
      {
        headers: {
          Authorization: token,
        }
      },
      null
    );

    // expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).message).toBe(
      "Institution requirements found successfully"
    );
    expect(JSON.parse(response.body).data).toHaveProperty("countries");
    expect(JSON.parse(response.body).data).toHaveProperty("social_medias");
  });

  it("should not get activity requirements if user is a student", async () => {
    const user_student = new UserMock().users[1];
    const token = await new TokenAuth().generate_token(user_student.id);
    const response = await handler(
      {
        headers: {
          Authorization: token,
        }
      },
      null
    );

    expect(response.statusCode).toBe(403);
    expect(JSON.parse(response.body).message).toBe("User not allowed");
  });
});