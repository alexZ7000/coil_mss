import { it, describe, expect } from 'vitest';
import { GetInstitutionController } from '../../../../src/modules/get_institution/app/get_institution_controler';
import { GetInstitutionUsecase } from '../../../../src/modules/get_institution/app/get_institution_usecase';
import { Repository } from '../../../../src/core/repositories/Repository';
import { HttpRequest } from '../../../../src/core/helpers/http/http_codes';
import { InstitutionRepoMock } from '../../../../src/core/repositories/mocks/InstitutionRepoMock';
import { UserRepoMock } from '../../../../src/core/repositories/mocks/UserRepoMock';

import { UserMock } from '../../../../src/core/structure/mocks/UserMock';

import {TokenAuth} from '../../../../src/core/helpers/functions/token_auth';

describe("Testing Get Institution Presenter", () => {
    const mockUserRepo = new UserRepoMock();
    const mockInstitutionRepo = new InstitutionRepoMock();


    const usecase = new GetInstitutionUsecase(
        mockInstitutionRepo, mockUserRepo
    );
    const controller = new GetInstitutionController(usecase);

    const mockAdmin = new UserMock().users[0];


    it("should return institution data", async () => {
        var token = (await new TokenAuth().generate_token(mockAdmin.id)).toString();
       const mockEvent = {
            headers: {
                Authorization: 
                token,
            },
            body: JSON.stringify({
                id: mockAdmin.id,
                name: mockAdmin.name,
                email: mockAdmin.email,
                user_type: mockAdmin.user_type,
                course: mockAdmin.course,
                semester_course: mockAdmin.semester_course,
                created_at: mockAdmin.created_at,
                updated_at: mockAdmin.updated_at
            }),
            queryStringParameters: {
                id: 1,
            },
        };

        const request = new HttpRequest(mockEvent);

        // Execute the controller
        const response = await controller.execute(request);

        // Assert the response
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            id: 1,
            name: "Sample Institution",
            // Add other expected properties
        });
    });
});