import { it, describe, expect } from "vitest";

import { UserMock } from "../../../../src/core/structure/mocks/UserMock";
import { TokenAuth } from "../../../../src/core/helpers/functions/token_auth";
import { handler } from "../../../../src/modules/get_all_activities_enrolled/app/get_all_activities_enrolled_presenter";
import { ActivityMock } from "../../../../src/core/structure/mocks/ActivityMock";
import { ActivityTypeEnum } from "../../../../src/core/helpers/enums/ActivityTypeEnum";

describe("Testing Get All Activities Enrolled Presenter", () => {
  const user_student = new UserMock().users[1];
  const activityMock = new ActivityMock();

  it("should get all activities enrolled for a student", async () => {
    var token = (
      await new TokenAuth().generate_token(user_student.id)
    );

    var response = await handler(
      {
        headers: {
          Authorization: token,
        },
        queryStringParameters: {
          type_activity: ActivityTypeEnum.PROJECT
        }
      },
      null
    );

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).message).toBe("Activities enrolled found successfully");
  });

  it("should not get activities enrolled for a non-student user", async () => {
    const user_admin = new UserMock().users[0];
    var token = (
      await new TokenAuth().generate_token(user_admin.id)
    );

    var response = await handler(
      {
        headers: {
          Authorization: token,
        },
        queryStringParameters: {
          type_activity: ActivityTypeEnum.PROJECT
        }
      },
      null
    );

    expect(response.statusCode).toBe(403); 
    expect(JSON.parse(response.body).message).toBe("User is not a student");
  });

  it("should not get activities enrolled with invalid token", async () => {
    var response = await handler(
      {
        headers: {
          Authorization: "invalid_token",
        },
        queryStringParameters: {
          type_activity: ActivityTypeEnum.PROJECT
        }
      },
      null
    );

    expect(response.statusCode).toBe(401);
    expect(JSON.parse(response.body).message).toBe("Invalid or expired token");
  });

  it("should not get activities enrolled with missing parameters", async () => {
    var token = (
      await new TokenAuth().generate_token(user_student.id)
    ).toString();

    var response = await handler(
      {
        headers: {
          Authorization: token,
        },
        queryStringParameters: null
      },
      null
    );

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body).message).toBe("Query String Parameters not found");
  });

  it("should not get activities enrolled with invalid request", async () => {
    var token = (
      await new TokenAuth().generate_token(user_student.id)
    ).toString();

    var response = await handler(
      {
        headers: null,
        queryStringParameters: {
          type_activity: "PROJECT"
        }
      },
      null
    );

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body).message).toBe("Headers not found");
  });
});
