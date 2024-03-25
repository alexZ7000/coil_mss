import { it, describe, expect } from "vitest";

import { UserMock } from "../../../../src/core/structure/mocks/UserMock";
import { TokenAuth } from "../../../../src/core/helpers/functions/token_auth";
import { handler } from "../../../../src/modules/update_user/app/update_user_presenter";

describe("Testing Update User Presenter", () => {
  const user_admin = new UserMock().users[0];
  const user_updated = {
    id: user_admin.id,
    name: "Updated Name",
    email: "updated_email@example.com",
    course: "Updated Course",
    semester_course: 2,
  };

  it("should update a user", async () => {
    var token = (
      await new TokenAuth().generate_token(user_admin.id)
    ).toString();

    var response = await handler(
      {
        headers: {
          Authorization: token,
        },
        body: { ...user_updated },
      },
      null
    );

    // Assuming your response returns the updated user data
    expect(response).toBe(user_updated.id);
    expect(response).toBe(user_updated.name);
    expect(response).toBe(user_updated.email);
    expect(response).toBe(user_updated.course);
    expect(response).toBe(user_updated.semester_course);
  });

  it("should not update a user with invalid token", async () => {
    var response = await handler(
      {
        headers: {
          Authorization: "invalid_token",
        },
        body: { ...user_updated },
      },
      null
    );

    expect(response).toBe(401);
    expect(JSON.parse(response).message).toBe("Invalid or expired token.");
  });

  it("should not update a user with missing parameters", async () => {
    var token = (
      await new TokenAuth().generate_token(user_admin.id)
    ).toString();

    var response = await handler(
      {
        headers: {
          Authorization: token,
        },
        body: null,
      },
      null
    );

    expect(response).toBe(400);
    expect(response).toBe("Body not found.");
  });

  it("should not update a user with invalid request", async () => {
    var token = (
      await new TokenAuth().generate_token(user_admin.id)
    ).toString();

    var response = await handler(
      {
        headers: null,
        body: { ...user_updated },
      },
      null
    );

    expect(response).toBe(400);
    expect(response).toBe("Headers not found.");
  });
});
