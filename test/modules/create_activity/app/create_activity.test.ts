import { it, describe, expect } from 'vitest';

import { UserMock } from '../../../../src/core/structure/mocks/UserMock';
import { TokenAuth } from '../../../../src/core/helpers/functions/token_auth';
import { ActivityMock } from '../../../../src/core/structure/mocks/ActivityMock';
import { handler } from '../../../../src/modules/create_activity/app/create_activity_presenter';


describe("Testing Create Activity Presenter", () => {
  const user_admin = new UserMock().users[0];
  const activity = {
    title: "Activity Test",
    description: "Activity Test Description",
    start_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 * 2),
    end_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 * 3),
    languages: [
      new ActivityMock().activities[0].languages[0].id,
      new ActivityMock().activities[0].languages[1].id,
    ],
    partner_institutions: [
      new ActivityMock().activities[0].partner_institutions[0].id
    ],
    courses: [
      new ActivityMock().activities[0].courses[0].id,
      new ActivityMock().activities[0].courses[1].id,
    ],
    criterias: [
      { id: new ActivityMock().activities[0].criterias[0].id },
      { criteria: "Python" },
    ],
    type_activity: 1,
  };

  it("should create an activity", async () => {
    var token = (await new TokenAuth().generate_token(user_admin.id)).toString();

    var response = await handler({
      headers: {
        Authorization: token
      },
      body: JSON.stringify(activity)
    }, null);

    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.body).message).toBe("Activity created successfully");
  });

  it("should not create an activity with invalid token", async () => {
    var response = await handler({
      headers: {
        Authorization: "invalid_token"
      },
      body: JSON.stringify(activity)
    }, null);

    expect(response.statusCode).toBe(401);
    expect(JSON.parse(response.body).message).toBe("Invalid or expired token");
  });

  it("should not create an activity with missing parameter title", async () => {
    var token = (await new TokenAuth().generate_token(user_admin.id)).toString();

    var response = await handler({
      headers: {
        Authorization: token
      },
      body: JSON.stringify({
        title: "",
        description: "Activity Test Description",
        date: "2021-10-10",
        time: "10:00",
        location: "Activity Test Location",
        vacancies: 10
      })
    }, null);

    expect(response.statusCode).toBe(422);
    expect(JSON.parse(response.body).message).toBe("Missing parameter: Title");
  });

  it("should not create an activity with missing parameter description", async () => {
    var token = (await new TokenAuth().generate_token(user_admin.id)).toString();

    var response = await handler({
      headers: {
        Authorization: token
      },
      body: JSON.stringify({
        title: "Activity Test",
        description: "",
        date: "2021-10-10",
        time: "10:00",
        location: "Activity Test Location",
        vacancies: 10
      })
    }, null);

    expect(response.statusCode).toBe(422);
    expect(JSON.parse(response.body).message).toBe("Missing parameter: Description");
  });
});

