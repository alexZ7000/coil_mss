import { it, describe, expect } from "vitest";
import { UserMock } from "../../../../src/core/structure/mocks/UserMock";
import { TokenAuth } from "../../../../src/core/helpers/functions/token_auth";
import { ActivityMock } from "../../../../src/core/structure/mocks/ActivityMock";
import { handler } from "../../../../src/modules/get_activity_requirements/app/get_activity_requirements_presenter";

describe("Testing Get Activity Requirements Presenter", () => {
  const user_admin = new UserMock().users[0];

  it("should get activity requirements for admin user", async () => {
    const activityMock = new ActivityMock();
    const token = await new TokenAuth().generate_token(user_admin.id);

    const activity = activityMock.activities[0];

    const response = await handler(
      {
        headers: {
          Authorization: token,
        },
        queryStringParameters: {
          activity_id: activity.id,
        },
      },
      null
    );

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).message).toBe(
      "Activity requirements found successfully"
    );
    expect(JSON.parse(response.body).data).toHaveProperty("courses");
    expect(JSON.parse(response.body).data).toHaveProperty("criterias");
    expect(JSON.parse(response.body).data).toHaveProperty("languages");
    expect(JSON.parse(response.body).data).toHaveProperty("institutions");
  });

  it("should not get activity requirements if user is a student", async () => {
    const user_student = new UserMock().users[1];
    const token = await new TokenAuth().generate_token(user_student.id);

    const activityMock = new ActivityMock();
    const activity = activityMock.activities[0];

    const response = await handler(
      {
        headers: {
          Authorization: token,
        },
        queryStringParameters: {
          activity_id: activity.id,
        },
      },
      null
    );

    expect(response.statusCode).toBe(403);
    expect(JSON.parse(response.body).message).toBe("User not allowed");
  });

  it("should not get activity requirements with invalid token", async () => {
    const response = await handler(
      {
        headers: {
          Authorization: "invalid_token",
        },
        queryStringParameters: {
          activity_id: "activity_id",
        },
      },
      null
    );

    expect(response.statusCode).toBe(401);
  });
});