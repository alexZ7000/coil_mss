import { it, describe, expect } from 'vitest';

import { handler } from '../../../../src/modules/get_all_courses/app/get_all_courses_presenter';
import { UserMock } from '../../../../src/core/structure/mocks/UserMock';
import { TokenAuth } from '../../../../src/core/helpers/functions/token_auth';

describe("Testing getting all courses", () => {
  const user_admin = new UserMock().users[0];
  const user_student = new UserMock().users[1];

  it("Should return a success message", async () => {
    var token = (await new TokenAuth().generate_token(user_admin.id)).toString();
    const event = {
      headers: {
        Authorization: token,
      }
    };
    const response = await handler(event, null);
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).message).toBe("Courses found successfully");
  });

  it("Should return a success message for student", async () => {
    var token = (await new TokenAuth().generate_token(user_student.id)).toString();
    const event = {
      headers: {
        Authorization: token,
      }
    };
    const response = await handler(event, null);
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).message).toBe("Courses found successfully");
  });
});