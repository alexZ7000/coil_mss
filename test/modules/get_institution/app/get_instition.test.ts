import { it, describe, expect } from 'vitest';

import { UserMock } from '../../../../src/core/structure/mocks/UserMock';
import {TokenAuth} from '../../../../src/core/helpers/functions/token_auth';
import { InstitutionMock } from '../../../../src/core/structure/mocks/InstitutionMock';
import { handler } from '../../../../src/modules/get_institution/app/get_institution_presenter';

describe("Testing Get Institution Presenter", () => {
    const user_admin = new UserMock().users[0];
    const mockInstitution = new InstitutionMock();


    it("should return institution data", async () => {
        var token = (await new TokenAuth().generate_token(user_admin.id)).toString();

        var response =  await handler({
            headers: {
                Authorization: token
            },
            body: JSON.stringify({
                institution_id: mockInstitution.institutions[0].id
            })
        }, null);

        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body).message).toBe("Institution found");
    });

    it("should not return institution with invalid token", async () => {
        var response =  await handler({
            headers: {
                Authorization: "invalid_token"
            },
            body: JSON.stringify({
                institution_id: mockInstitution.institutions[0].id
            })
        }, null);

        expect(response.statusCode).toBe(401);
        expect(JSON.parse(response.body).message).toBe("Invalid or expired token");
    });
});