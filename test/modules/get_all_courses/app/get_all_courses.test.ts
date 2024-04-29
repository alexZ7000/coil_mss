import { it, describe, expect } from 'vitest';

import { handler } from '../../../../src/modules/auth_user/app/auth_user_presenter';
import { CourseMock } from '../../../../src/core/structure/mocks/CourseMock';
import { UserMock } from '../../../../src/core/structure/mocks/UserMock';
import { TokenAuth } from '../../../../src/core/helpers/functions/token_auth';

describe("Testing getting all courses", () => {
  const user_admin = new UserMock().users[0];
  const user_student = new UserMock().users[1];
  const user_moderator = new UserMock().users[2];

  it("Should return a success message", async () => {
    let courses = new CourseMock().courses;
    let course = courses[0];
    let token = (await new TokenAuth().generate_token(user_admin.id));
    const event = {
      headers: {
        Authorization: token,
      },
      body: JSON.stringify({
        user_id: user_student.id,
        course_id: course.id,
      }),
    };
    const response = await handler(event, null);
    //expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).message).toBe("User authenticated successfully");
  });

  it("Should return a not found error", async () => {
    let token = (await new TokenAuth().generate_token(user_admin.id));
    const event = {
      headers: {
        Authorization: token,
      },
      body: JSON.stringify({
        user_id: "invalid_id",
        course_id: "invalid_id",
      }),
    };
    const response = await handler(event, null);
    //expect(response.statusCode).toBe(404);
    expect(JSON.parse(response.body).message).toBe("User or Course not found");
  });
});