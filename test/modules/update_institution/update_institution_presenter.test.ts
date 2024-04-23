import { it, describe, expect } from "vitest";

import { TokenAuth } from "../../../src/core/helpers/functions/token_auth";
import { UserMock } from "../../../src/core/structure/mocks/UserMock";
import { handler } from "../../../src/modules/update_institution.ts copy/update_institution/update_institution_presenter";

describe("Testing Update Institution Presenter", () => {
  const user_admin = new UserMock().users[0];
  const institution_admin = {
    id: '365556ad-69d2-43cd-b98c-287bf7606fba',
    name: 'Test',
    email: 'test@example.com',
    country: 'Test Country',
    images: ['image1.jpg', 'image2.jpg'],
    social_medias: [{
      media: 'twitter',
      link: 'twitter.com'
    }]
  };

  const institution_updated = {
      id: '365556ad-69d2-43cd-b98c-287bf7606fba',
      name: "Updated University",
      country: "Updated Country",
  };

  it("should update an institution", async () => {
    var token = (await new TokenAuth().generate_token(user_admin.id)).toString();

    var response = await handler(
      {
        headers: {
          Authorization: token,
        },
        body: institution_updated,
      },
      null
    );

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).message).toBe("Institution updated successfully");
  });

  it("should not update an institution with invalid token", async () => {
    var response = await handler(
      {
        headers: {
          Authorization: "invalid_token",
        },
        body: institution_updated,
      },
      null
    );
    console.log(response);

    expect(response.statusCode).toBe(401);
    expect(JSON.parse(response.body).message).toBe("Invalid or expired token");
  });

  it("should not update an institution with missing parameters", async () => {
    var token = (
      await new TokenAuth().generate_token(institution_admin.id)
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

  it("should not update an institution with invalid request", async () => {
    var token = (
      await new TokenAuth().generate_token(institution_admin.id)
    ).toString();

    var response = await handler(
      {
        headers: null,
        body: institution_updated,
      },
      null
    );

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body).message).toBe("Headers not found");
  });
});