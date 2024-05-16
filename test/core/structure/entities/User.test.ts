import { it, describe, expect } from 'vitest';

import { User } from '../../../../src/core/structure/entities/User';
import { UserTypeEnum } from '../../../../src/core/helpers/enums/UserTypeEnum';
import { EntityError } from '../../../../src/core/helpers/errors/EntityError';
import { UserMock } from '../../../../src/core/structure/mocks/UserMock';

describe("Testing User Entity", () => {
    it("should create a user", async () => {
        const user_mock = new UserMock().users;
        var user = user_mock[1];

        expect(user.id).toBe(user_mock[1].id);
        expect(user.name).toBe(user_mock[1].name);
        expect(user.email).toBe(user_mock[1].email);
        expect(user.user_type).toBe(UserTypeEnum.STUDENT);
        expect(user.created_at).toBe(user_mock[1].created_at);
        expect(user.updated_at).toBe(user_mock[1].updated_at);
    });

    it("should not create a user without id", async () => {
        const user_mock = new UserMock().users;
        var user = user_mock[1];
        user.id = null;

        expect(async () => {
            new User(user);
        }).rejects.toThrow("EntityError: Parameter id is required");
    });

    it("should not create a user without name", async () => {
        const user_mock = new UserMock().users;
        var user = user_mock[1];
        user.name = null;

        expect(async () => {
            new User(user);
        }).rejects.toThrow("EntityError: Parameter name is required");
    });

    it("should not create a user without email", async () => {
        const user_mock = new UserMock().users;
        var user = user_mock[1];
        user.email = null;

        expect(async () => {
            new User(user);
        }).rejects.toThrow("Parameter email is required");
    });

    it("should not create a user without user type", async () => {
        const user_mock = new UserMock().users;
        var user = user_mock[1];
        user.user_type = null;

        expect(async () => {
            new User(user);
        }).rejects.toThrow("EntityError: Parameter user_type is required");
    });

    it("should not create a user without created_at", async () => {
        const user_mock = new UserMock().users;
        var user = user_mock[1];
        user.created_at = null;

        expect(async () => {
            new User(user);
        }).rejects.toThrow("EntityError: Parameter created_at is required");
    });

    it("should not create a user without updated_at", async () => {
        const user_mock = new UserMock().users;
        var user = user_mock[1];
        user.updated_at = null;

        expect(async () => {
            new User(user);
        }).rejects.toThrow("EntityError: Parameter updated_at is required");
    });

    it("should not create a user with invalid email", async () => {
        const user_mock = new UserMock().users;
        var user = user_mock[1];
        user.email = "invalid_email";

        expect(async () => {
            new User(user);
        }).rejects.toThrow("EntityError: Invalid Email, must be a maua.br domain");
    });

    it("should not create a user with invalid user type", async () => {
        const user_mock = new UserMock().users;
        var user = user_mock[1];
        user.user_type = "invalid_user_type";

        expect(async () => {
            new User(user);
        }).rejects.toThrow("EntityError: Parameter user_type is not a UserTypeEnum");
    });

    it("should not create a user with invalid created_at", async () => {
        const user_mock = new UserMock().users;
        var user = user_mock[1];
        user.created_at = "invalid_created_at";

        expect(async () => {
            new User(user);
        }).rejects.toThrow("EntityError: Parameter created_at is not a Date");
    });

    it("should not create a user with invalid updated_at", async () => {
        const user_mock = new UserMock().users;
        var user = user_mock[1];
        user.updated_at = "invalid_updated_at";

        expect(async () => {
            new User(user);
        }).rejects.toThrow("EntityError: Parameter updated_at is not a Date");
    });
}); 

