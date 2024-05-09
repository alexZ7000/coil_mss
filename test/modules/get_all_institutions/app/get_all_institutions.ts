import { it, describe, expect } from "vitest";

import { UserMock } from "../../../../src/core/structure/mocks/UserMock";
import { TokenAuth } from "../../../../src/core/helpers/functions/token_auth";
import { InstitutionMock } from "../../../../src/core/structure/mocks/InstitutionMock";
import { handler } from "../../../../src/modules/get_all_institutions/app/get_all_institutions_presenter";

describe("Testing Get All Institutions", () => {
  const user_student = new UserMock().users[1];
  const institution_mock = new InstitutionMock();

  it("Should return all institutions", async () => {
    const token = new TokenAuth().generate_token(user_student.id);
    const response = await handler({ headers: { Authorization: token } }, {});
    const institutions = institution_mock.institutions.map((institution) => {
      return {
        id: institution.id,
        name: institution.name,
        logo: institution.images[0],
      };
    });
    expect(response).toEqual(institutions);
  });

  it("Should return an error if the token is invalid", async () => {
    const response = await handler({ headers: { Authorization: "invalid_token" } }, {});
    expect(response).toEqual({ error: "Invalid or expired token" });
  });

  it("Should return an error if the token is missing", async () => {
    const response = await handler({ headers: {} }, {});
    expect(response).toEqual({ error: "Authorization header is missing" });
  });

  it("Should return an error if the user is not authenticated", async () => {
    const token = new TokenAuth().generate_token("invalid_user_id");
    const response = await handler({ headers: { Authorization: token } }, {});
    expect(response).toEqual({ error: "User not authenticated" });
  });
});