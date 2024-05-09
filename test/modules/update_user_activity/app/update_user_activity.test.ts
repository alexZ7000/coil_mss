import { it, describe, expect } from "vitest";

import { TokenAuth } from "../../../../src/core/helpers/functions/token_auth";

import { UserMock } from "../../../../src/core/structure/mocks/UserMock";
import { ActivityMock } from "../../../../src/core/structure/mocks/ActivityMock";
import { handler } from "../../../../src/modules/update_user_activity/app/update_user_activity_presenter";

describe("Testing Update User Activity Presenter", () => {
  const user_admin = new UserMock().users[0];

  it("should update a user activity", async () => {
    const activity = new ActivityMock().activities[1];
    var token = (
      await new TokenAuth().generate_token(user_admin.id)
    );

    var response = await handler(
      {
        headers: {
          Authorization: token,
        },
        body: {
          activity_id: activity.id,
          applicant_id: activity.applicants[0].id,
        }
      },
      null
    );

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).message).toBe("User activity updated successfully");
  });

  it("should not update a user activity with invalid token", async () => {
    var response = await handler(
      {
        headers: {
          Authorization: "invalid_token",
        },
        body: {
          activity_id: "activity_id",
          applicant_id: "applicant_id",
        }
      },
      null
    );

    expect(response.statusCode).toBe(401);
    expect(JSON.parse(response.body).message).toBe("Invalid or expired token");
  });

  it("should not update a user activity with missing parameters", async () => {
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

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body).message).toBe("Body not found");
  });

  it("should not update a user activity with activity_status not ON_HOLD", async () => {
    const activity = new ActivityMock().activities[0];
    var token = (
      await new TokenAuth().generate_token(user_admin.id)
    );

    var response = await handler(
      {
        headers: {
          Authorization: token,
        },
        body: {
          activity_id: activity.id,
          applicant_id: activity.applicants[0].id,
        }
      },
      null
    );

    expect(response.statusCode).toBe(403);
    expect(JSON.parse(response.body).message).toBe("Activity is not on hold");
  });
});
