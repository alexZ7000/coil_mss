import { it, describe, expect } from 'vitest';
import { GetInstitutionController } from '../../../../src/modules/get_institution/app/get_institution_controler';
import { GetInstitutionUsecase } from '../../../../src/modules/get_institution/app/get_institution_usecase';
import { Repository } from '../../../../src/core/repositories/Repository';
import { HttpRequest } from '../../../../src/core/helpers/http/http_codes';
import { InstitutionRepoMock } from '../../../../src/core/repositories/mocks/InstitutionRepoMock';
import { UserRepoMock } from '../../../../src/core/repositories/mocks/UserRepoMock';
import { HttpRequest } from '../../../../src/core/helpers/http/http_codes';

describe("Testing Get Institution Presenter", () => {
    it("should return institution data", async () => {
        const mockUserRepo = new UserRepoMock();
        const mockInstitutionRepo = new InstitutionRepoMock();


        const usecase = new GetInstitutionUsecase(
            mockInstitutionRepo, mockUserRepo
        );
        const controller = new GetInstitutionController(usecase);

        const mockEvent = {
            body: {
                property1: "value1",
                property2: "value2",
            },
            headers: {
                Authorization: "Bearer token",
                "Content-Type": "application/json",
            },
            queryStringParameters: {
                param1: "value1",
                param2: "value2",
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