import { it, describe, expect } from 'vitest';

import { handler } from '../../../../src/modules/assign_user/app/assign_user_presenter';

import { UserMock } from '../../../../src/core/structure/mocks/UserMock';
import { ActivityMock } from '../../../../src/core/structure/mocks/ActivityMock';
import { TokenAuth } from '../../../../src/core/helpers/functions/token_auth';


describe("Assign User Presenter", () => {
    const activity = new ActivityMock().activities[0];
    const user_admin = new UserMock().users[0];
    const user_student = new UserMock().users[1];
    it("Should unassigned user", async () => {
        const event = {
            headers: {
                Authorization: (await new TokenAuth().generate_token(user_student.id)).toString(),
            },
            queryStringParameters: {
                activity_id: activity.id,
            },
        };
        const response = await handler(event, null);
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body).message).toBe("User unassigned successfully");
    });

    it("Should assign user", async () => {
        const event = {
            headers: {
                Authorization: (await new TokenAuth().generate_token(user_student.id)).toString(),
            },
            queryStringParameters: {
                activity_id: activity.id,
            },
        };
        const response = await handler(event, null);
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body).message).toEqual("User assigned successfully");
    });

    it("Shouldn assign admin user", async () => {
        const event = {
            headers: {
                Authorization: (await
                    new TokenAuth().generate_token(user_admin.id)).toString(),
            },
            queryStringParameters: {
                activity_id: activity.id,
            },
        };
        const response = await handler(event, null);
        expect(response.statusCode).toBe(403);
        expect(JSON.parse(response.body).message).toBe("User not allowed");
    });
});