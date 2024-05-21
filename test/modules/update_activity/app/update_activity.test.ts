import { it, describe, expect } from 'vitest';

import { UserMock } from '../../../../src/core/structure/mocks/UserMock';
import { TokenAuth } from '../../../../src/core/helpers/functions/token_auth';
import { ActivityMock } from '../../../../src/core/structure/mocks/ActivityMock';
import { ActivityStatusEnum } from '../../../../src/core/helpers/enums/ActivityStatusEnum';
import { handler } from "../../../../src/modules/update_activity/app/update_activity_presenter";

describe("Update Activity Presenter", () => {
  const user_admin = new UserMock().users[0];
  const user_student = new UserMock().users[1];

  it("Should return a success message", async () => {
    let activities = new ActivityMock().activities;
    let activity = activities[0];
    let token = (await new TokenAuth().generate_token(user_admin.id)).toString();
    const event = {
      headers: {
        Authorization: token,
      },
      body: JSON.stringify({
        activity_id: activity.id,
        title: "New Title",
        description: "New Description",
        languages: [activity.languages[0].id, activity.languages[1].id],
        partner_institutions: [activity.partner_institutions[0].id],
        criterias: [{ id: activity.criterias[0].id }],
        courses: [activity.courses[0].course?.id],
        status_activity: ActivityStatusEnum.ENDED,
        type_activity: activity.type_activity,
        start_date: activity.start_date,
        end_date: activity.end_date,
      }),
    };
    const response = await handler(event, null);
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).message).toBe("Activity updated successfully");
  });

  it("Should return a not found error", async () => {
    let token = (await new TokenAuth().generate_token(user_admin.id)).toString();
    const event = {
      headers: {
        Authorization: token,
      },
      body: JSON.stringify({
        activity_id: "invalid_id",
        title: "Title",
        description: "New Description",
        languages: [],
        partner_institutions: [],
        criterias: [],
        courses: [],
        status_activity: null,
        type_activity: "PROJECT",
        start_date: new Date(),
        end_date: new Date(),
      }),
    };
    const response = await handler(event, null);
    expect(response.statusCode).toBe(404);
    expect(JSON.parse(response.body).message).toBe("Activity not found");
  });

  it("Should return an invalid parameter error", async () => {
    let activities = new ActivityMock().activities;
    let activity = activities[0];
    let token = (await new TokenAuth().generate_token(user_admin.id)).toString();
    const event = {
      headers: {
        Authorization: token,
      },
      body: JSON.stringify({
        activity_id: activity.id,
        title: "Title",
        description: "New Description",
        languages: [activity.languages[0].id, activity.languages[1].id],
        partner_institutions: [activity.partner_institutions[0].id],
        criterias: [{ id: activity.criterias[0].id }],
        courses: [activity.courses[0].course?.id],
        status_activity: null,
        type_activity: activity.type_activity,
        start_date: new Date().getTime() - 1000 * 60 * 60 * 24 * 7,
        end_date: new Date(),
      }),
    };
    const response = await handler(event, null);
    expect(response.statusCode).toBe(422);
    expect(JSON.parse(response.body).message).toBe("Invalid parameter: StartDate: Start Date must be in the future");
  });

  it("Shouldn't update activity if user is not an admin", async () => {
    let activities = new ActivityMock().activities;
    let activity = activities[0];
    let token = (await new TokenAuth().generate_token(user_student.id)).toString();
    const event = {
      headers: {
        Authorization: token,
      },
      body: JSON.stringify({
        activity_id: activity.id,
        title: "Title",
        description: "New Description",
        languages: ["English", "Portuguese"],
        partner_institutions: [activity.partner_institutions[0].id],
        criterias: [activity.criterias[0].criteria],
        courses: [{ id: activity.courses[0].id, name: activity.courses[0].name }],
        status_activity: activity.status_activity,
        type_activity: activity.type_activity,
        start_date: new Date(),
        end_date: new Date(),
      }),
    };
    const response = await handler(event, null);
    expect(response.statusCode).toBe(403);
    expect(JSON.parse(response.body).message).toBe("User not allowed");
  });

  it("Shouldn't update activity with the title already in use", async () => {
    let activities = new ActivityMock().activities;
    let activity = activities[0];
    let token = (await new TokenAuth().generate_token(user_admin.id)).toString();
    const event = {
      headers: {
        Authorization: token,
      },
      body: JSON.stringify({
        activity_id: activity.id,
        title: activities[1].title,
        description: "New Description",
        languages: ["English", "Portuguese"],
        partner_institutions: [activity.partner_institutions[0].id],
        criterias: [activity.criterias[0].criteria],
        courses: [{ id: activity.courses[0].id, name: activity.courses[0].name }],
        status_activity: null,
        type_activity: activity.type_activity,
        start_date: new Date(),
        end_date: new Date(),
      }),
    };
    const response = await handler(event, null);
    expect(response.statusCode).toBe(422);
    expect(JSON.parse(response.body).message).toBe("Activity with this title already exists");
  });
}); 