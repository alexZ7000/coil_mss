import { it, describe, expect } from "vitest";
import { UserMock } from "../../../../src/core/structure/mocks/UserMock";
import { TokenAuth } from "../../../../src/core/helpers/functions/token_auth";
import { ActivityMock } from "../../../../src/core/structure/mocks/ActivityMock";
import { handler } from "../../../../src/modules/get_activity/app/get_activity_presenter";

describe("Testing Get Activity Presenter", () => {
  const user_admin = new UserMock().users[0];

  it("should get activity for admin user", async () => {
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
      "Activity found successfully"
    );
    expect(JSON.parse(response.body).data.id).toBe(activity.id);
  });

  it("should not get activity applicants if user is a student", async () => {
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

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).data.applicants).toEqual([]);
  });

  it("should not get activity with invalid token", async () => {
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
    expect(JSON.parse(response.body).message).toBe("Invalid or expired token");
  });

  it("should not get activity with invalid request", async () => {
    const activityMock = new ActivityMock();
    const token = await new TokenAuth().generate_token(user_admin.id);

    const response = await handler(
      {
        headers: null,
        queryStringParameters: {
          activity_id: "activity_id",
        },
      },
      null
    );

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body).message).toBe("Headers not found");
  });
});
