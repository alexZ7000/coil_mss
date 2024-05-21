import { it, describe, expect } from 'vitest';

import { UserMock } from '../../../../src/core/structure/mocks/UserMock';
import { TokenAuth } from '../../../../src/core/helpers/functions/token_auth';
import { handler } from '../../../../src/modules/create_moderator/app/create_moderator_presenter';


describe("Testing Create Moderator Presenter", () => {
    const user_admin = new UserMock().users[0];
    const user_student = new UserMock().users[1];
    const user_moderator = {
        email: "moderador@maua.br"
    };
    
    it("should create a moderator", async () => {
        var token = (await new TokenAuth().generate_token(user_admin.id)).toString();

        var response =  await handler({
            headers: {
                Authorization: token
            },
            body: JSON.stringify(user_moderator)
        }, null);

        expect(response.statusCode).toBe(201);
        expect(JSON.parse(response.body).message).toBe("Moderator created successfully");     
    });

    it("should not create a moderator with invalid token", async () => {
        var response =  await handler({
            headers: {
                Authorization: "invalid_token"
            },
            body: JSON.stringify(user_moderator)
        }, null);

        expect(response.statusCode).toBe(401);
        expect(JSON.parse(response.body).message).toBe("Invalid or expired token");
    });

    it("should not create a moderator with missing parameter email", async () => {
        var token = (await new TokenAuth().generate_token(user_admin.id)).toString();

        var response =  await handler({
            headers: {
                Authorization: token
            },
            body: JSON.stringify({
                name: "Moderator Test",
                email: ""
            })
        }, null);

        expect(response.statusCode).toBe(422);
        expect(JSON.parse(response.body).message).toBe("Missing parameter: Email");
    });

    it("should not create a moderator with invalid user type", async () => {
        var token = (await new TokenAuth().generate_token(user_student.id)).toString();

        var response =  await handler({
            headers: {
                Authorization: token
            },
            body: JSON.stringify(user_moderator)
        }, null);

        expect(response.statusCode).toBe(403);
        expect(JSON.parse(response.body).message).toBe("User not allowed");
    });

    it("should not create a moderator with invalid request", async () => {
        var token = (await new TokenAuth().generate_token(user_admin.id)).toString();

        var response =  await handler({
            headers: {
                Authorization: token
            },
            body: null
        }, null);

        expect(response.statusCode).toBe(400);
        expect(JSON.parse(response.body).message).toBe("Body not found");
    });

    it("should not create a moderator with invalid request", async () => {
        var token = (await new TokenAuth().generate_token(user_admin.id)).toString();

        var response =  await handler({
            headers: null,
            body: JSON.stringify(user_moderator)
        }, null);

        expect(response.statusCode).toBe(400);
        expect(JSON.parse(response.body).message).toBe("Headers not found");
    });
}); 