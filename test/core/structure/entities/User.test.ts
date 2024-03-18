import { it, describe, expect } from 'vitest';

import { User } from '../../../../src/core/structure/entities/User';
import { UserTypeEnum } from '../../../../src/core/helpers/enums/UserTypeEnum';
import { EntityError } from '../../../../src/core/helpers/errors/EntityError';
import { UserMock } from '../../../../src/core/structure/mocks/UserMock';

describe("Testing User Entity", () => {
    const user_mock = new UserMock().users;
    it("should create a user", async () => {
        var user = user_mock[1];

        expect(user.id).toBe(user_mock[1].id);
        expect(user.name).toBe(user_mock[1].name);
        expect(user.email).toBe(user_mock[1].email);
        expect(user.course).toBe(user_mock[1].course);
        expect(user.semester_course).toBe(user_mock[1].semester_course);
        expect(user.user_type).toBe(UserTypeEnum.STUDENT);
        expect(user.created_at).toBe(user_mock[1].created_at);
        expect(user.updated_at).toBe(user_mock[1].updated_at);
    });

    it("should not create a user without id", async () => {
        var user = user_mock[1];
        user.id = null;

        expect(() => {
            new User(user);
        }).toThrowError(EntityError);
    });

    it("should not create a user without name", async () => {
        var user = user_mock[1];
        user.name = null;

        expect(() => {
            new User(user);
        }).toThrowError(EntityError);
    });

    it("should not create a user without email", async () => {
        var user = user_mock[1];
        user.email = null;

        expect(() => {
            new User(user);
        }).toThrowError(EntityError);
    });

    it("should not create a user without user type", async () => {
        var user = user_mock[1];
        user.user_type = null;

        expect(() => {
            new User(user);
        }).toThrowError(EntityError);
    });

    it("should not create a user without created_at", async () => {
        var user = user_mock[1];
        user.created_at = null;

        expect(() => {
            new User(user);
        }).toThrowError(EntityError);
    });

    it("should not create a user without updated_at", async () => {
        var user = user_mock[1];
        user.updated_at = null;

        expect(() => {
            new User(user);
        }).toThrowError(EntityError);
    });

    it("should not create a user with invalid email", async () => {
        var user = user_mock[1];
        user.email = "invalid_email";

        expect(() => {
            new User(user);
        }).toThrowError(EntityError);
    });

    it("should not create a user with invalid user type", async () => {
        var user = user_mock[1];
        user.user_type = "invalid_user_type";

        expect(() => {
            new User(user);
        }).toThrowError(EntityError);
    });

    it("should not create a user with invalid created_at", async () => {
        var user = user_mock[1];
        user.created_at = "invalid_created_at";

        expect(() => {
            new User(user);
        }).toThrowError(EntityError);
    });

    it("should not create a user with invalid updated_at", async () => {
        var user = user_mock[1];
        user.updated_at = "invalid_updated_at";

        expect(() => {
            new User(user);
        }).toThrowError(EntityError);
    });
}); 

