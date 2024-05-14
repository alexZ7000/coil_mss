import { it, describe, expect } from 'vitest';

import { UserMock } from '../../../../src/core/structure/mocks/UserMock';
import { TokenAuth } from '../../../../src/core/helpers/functions/token_auth';
import { CountryMock } from '../../../../src/core/structure/mocks/CountryMock';
import { SocialMediaMock } from '../../../../src/core/structure/mocks/SocialMediaMock';
import { handler } from '../../../../src/modules/create_institution/app/create_institution_presenter';


describe("Testing Create Institution Presenter", () => {
    const user_admin = new UserMock().users[0];
    const contries = new CountryMock().countries;
    const social_medias = new SocialMediaMock().social_medias;
    const institution = {
        name: "Institution Test",
        email: "test@test.com",
        description: "Institution Test Description",
        logo: "https://www.google.com",
        countries: [
            contries[0].id,
            contries[1].id,
        ],
        social_medias: [
            { id: social_medias[0].id, link: "https://www.google.com" },
            { id: social_medias[1].id, link: "https://www.google.com" },
        ],
        images: [
            "https://www.google.com",
            "https://www.google.com",
        ],
        type_institution: 1,
    };

    it("should create an institution", async () => {
        var token = (await new TokenAuth().generate_token(user_admin.id)).toString();

        var response = await handler({
            headers: {
                Authorization: token
            },
            body: JSON.stringify(institution)
        }, null);

        // expect(response.statusCode).toBe(201);
        expect(JSON.parse(response.body).message).toBe("Institution created successfully");
    });

    it("should not create an institution with invalid token", async () => {
        var response = await handler({
            headers: {
                Authorization: "invalid_token"
            },
            body: JSON.stringify(institution)
        }, null);

        expect(response.statusCode).toBe(401);
        expect(JSON.parse(response.body).message).toBe("Invalid or expired token");
    });

    it("should not create an institution with missing parameters", async () => {
        var token = (await new TokenAuth().generate_token(user_admin.id)).toString();

        var response = await handler({
            headers: {
                Authorization: token
            },
            body: JSON.stringify({
                name: "Institution Test",
                description: "Institution Test Description",
                logo: "https://www.google.com",
                website: "https://www.google.com",
                type_institution: 1,
            })
        }, null);

        expect(response.statusCode).toBe(422);
        expect(JSON.parse(response.body).message).toBe("Missing parameter: Email");
    });
});
