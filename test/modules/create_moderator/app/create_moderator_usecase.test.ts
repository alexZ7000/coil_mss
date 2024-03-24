import { it, describe, expect } from 'vitest';

import { UserMock } from '../../../../src/core/structure/mocks/UserMock';
import { TokenAuth } from '../../../../src/core/helpers/functions/token_auth';
import { UserRepoMock } from '../../../../src/core/repositories/mocks/UserRepoMock';
import { CreateModeratorUsecase } from '../../../../src/modules/create_moderator/app/create_moderator_usecase';


describe("Testing Create Moderator Usecase", () => {
    const user_admin = new UserMock().users[0];
    const user_student = new UserMock().users[1];
    const user_moderator = new UserMock().users[2];

    it("should create a moderator", async () => {
        var token = (await new TokenAuth().generate_token(user_admin.id)).toString();
        const user_repo = new UserRepoMock();
        const create_moderator = new CreateModeratorUsecase(user_repo);

        var response =  await create_moderator.execute({
            Authorization: token
        },
        {
            email: "moderator@maua.br"
        });

        expect(response.email).toBe("moderator@maua.br");
    });
});


