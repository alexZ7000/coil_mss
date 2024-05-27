import { it, describe, expect } from 'vitest';
import { UserMock } from '../../../../src/core/structure/mocks/UserMock';
import { TokenAuth } from '../../../../src/core/helpers/functions/token_auth';
import { handler } from '../../../../src/modules/delete_moderator/app/delete_moderator_presenter';

describe("Testing Delete Moderator Presenter", () => {
    const user_admin = new UserMock().users[0];
    const user_moderator = new UserMock().users[2];

    it("should delete a moderator", async () => {
        var token = (await new TokenAuth().generate_token(user_admin.id)).toString();

        var response = await handler({
            headers: {
                Authorization: token
            },
            body: JSON.stringify({ moderator_id: user_moderator.id })
        }, null);

        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body).message).toBe("Moderator deleted successfully");
    });

    it("should not delete a moderator with invalid token", async () => {
        var response = await handler({
            headers: {
                Authorization: "invalid_token"
            },
            body: JSON.stringify({ moderator_id: user_moderator.id })
        }, null);

        expect(response.statusCode).toBe(401);
        expect(JSON.parse(response.body).message).toBe("Invalid or expired token");
    });

    it("should not delete a moderator with missing parameter moderator_id", async () => {
        var token = (await new TokenAuth().generate_token(user_admin.id)).toString();

        var response = await handler({
            headers: {
                Authorization: token
            },
            body: null
        }, null);

        expect(response.statusCode).toBe(400);
        expect(JSON.parse(response.body).message).toBe("Body not found");
    });
});
