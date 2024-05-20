import { it, describe, expect } from "vitest";

import { TokenAuth } from "../../../../src/core/helpers/functions/token_auth";

import { UserMock } from "../../../../src/core/structure/mocks/UserMock";
import { ActivityMock } from "../../../../src/core/structure/mocks/ActivityMock";
import { handler } from "../../../../src/modules/update_users_activity/app/update_users_activity_presenter";

describe("Testing Update Users Activity Presenter", () => {
  const user_admin = new UserMock().users[0];

  it("should update a update_users_activity activity", async () => {
    const activity = new ActivityMock().activities[1];
    var token = (
      await new TokenAuth().generate_token(user_admin.id)
    );
    var applicants = activity.applicants.map(applicant => applicant.id);

    var response = await handler(
      {
        headers: {
          Authorization: token,
        },
        body: {
          activity_id: activity.id,
          applicants: applicants,
        }
      },
      null
    );

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).message).toBe("User activity updated successfully");
  });

  it("should not update users activity with invalid token", async () => {
    var response = await handler(
      {
        headers: {
          Authorization: "invalid_token",
        },
        body: {
          activity_id: "activity_id",
          applicants: ["dawdawdaw"]
        }
      },
      null
    );
 
    expect(response.statusCode).toBe(401);
    expect(JSON.parse(response.body).message).toBe("Invalid or expired token");
  });

  it("should not update users activity with missing parameters", async () => {
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
          applicants: [activity.applicants[0].id]
        }
      },
      null
    );

    expect(response.statusCode).toBe(403);
    expect(JSON.parse(response.body).message).toBe("Activity is not on hold");
  });
});