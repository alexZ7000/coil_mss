import { it, describe, expect } from 'vitest';

import { handler } from '../../../../src/modules/auth_user/app/auth_user_presenter';


describe("Testing Auth User Presenter", () => {
    it("should not authenticated user with invalid token", async () => {
        var response =  await handler({
            headers: {
                Authorization: "invalid_token"
            }
        }, null);

        expect(response.statusCode).toBe(401);
        expect(JSON.parse(response.body).message).toBe("Invalid or expired token.");
    });

    it("should not authenticated user with missing token", async () => {
        var response =  await handler({
            headers: {}
        }, null);

        expect(response.statusCode).toBe(422);
        expect(JSON.parse(response.body).message).toBe("Missing parameter: Authorization");
    });
});

