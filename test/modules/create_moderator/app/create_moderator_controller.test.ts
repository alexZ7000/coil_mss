import { it, describe, expect } from 'vitest';

import { UserMock } from '../../../../src/core/structure/mocks/UserMock';
import { HttpRequest } from '../../../../src/core/helpers/http/http_codes';
import { TokenAuth } from '../../../../src/core/helpers/functions/token_auth';
import { UserRepoMock } from '../../../../src/core/repositories/mocks/UserRepoMock';
import { CreateModeratorUsecase } from '../../../../src/modules/create_moderator/app/create_moderator_usecase';
import { CreateModeratorController } from '../../../../src/modules/create_moderator/app/create_moderator_controller';

describe("Testing Create Moderator Controller", () => {
    
    it("should create a moderator", async () => {
        const user_admin = new UserMock().users[0];
        const user_moderator = new UserMock().users[2];
        var token = (await new TokenAuth().generate_token(user_admin.id)).toString();
        const create_moderator = new CreateModeratorUsecase(new UserRepoMock());
        const controller = new CreateModeratorController(create_moderator);

        var response =  await controller.execute(new HttpRequest({
            headers: {
                Authorization: token
            },
            body: {email: "moderator@maua.br"},
            queryStringParameters: {}
        }));

        // expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe("Moderator created successfully");
    });

    it("should not create a moderator with invalid token", async () => {
        const user_admin = new UserMock().users[0];
        const create_moderator = new CreateModeratorUsecase(new UserRepoMock());
        const controller = new CreateModeratorController(create_moderator);

        var response =  await controller.execute(new HttpRequest({
            headers: {
                Authorization: "invalid_token"
            },
            body: {email: "moderator@maua.br"},
            queryStringParameters: {}
        }));

        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe("Invalid or expired token");
    });

    it("should not create a moderator with missing parameter email", async () => {
        const user_admin = new UserMock().users[0];
        var token = (await new TokenAuth().generate_token(user_admin.id)).toString();
        const create_moderator = new CreateModeratorUsecase(new UserRepoMock());
        const controller = new CreateModeratorController(create_moderator);

        var response =  await controller.execute(new HttpRequest({
            headers: {
                Authorization: token
            },
            body: {email: ""},
            queryStringParameters: {}
        }));

        expect(response.statusCode).toBe(422);
        expect(response.body.message).toBe("Missing parameter: Email");
    });

    it("should not create a moderator with invalid user type", async () => {
        const user_student = new UserMock().users[1];
        var token = (await new TokenAuth().generate_token(user_student.id)).toString();
        const create_moderator = new CreateModeratorUsecase(new UserRepoMock());
        const controller = new CreateModeratorController(create_moderator);

        var response =  await controller.execute(new HttpRequest({
            headers: {
                Authorization: token
            },
            body: {email: user_student.email},
            queryStringParameters: {}
        }));

        expect(response.statusCode).toBe(403);
        expect(response.body.message).toBe("User not allowed");
    });
});