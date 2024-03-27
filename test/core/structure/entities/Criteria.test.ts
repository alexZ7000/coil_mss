import { it, describe, expect } from 'vitest'
import { Criteria } from '../../../../src/core/structure/entities/Criteria'


describe('Criteria', () => {
    it('should throw an error if the id is null', async () => {
        await expect(async () => {
            new Criteria({
                id: null,
                project_id: '123e4567-e89b-12d3-a456-426614174000',
                criteria: 'This test should fail'
            })
        }).rejects.toThrow('Parameter id is required');
    });

    it('should throw an error if the id is not a string', async () => {
        await expect(async () => {
            new Criteria({
                id: 123,
                project_id: '123e4567-e89b-12d3-a456-426614174000',
                criteria: 'This test should fail'
            })
        }).rejects.toThrow('Parameter id is not a string');
    });

    it('should throw an error if the id is not a valid UUID', async () => {
        await expect(async () => {
            new Criteria({
                id: 'invalid-uuid',
                project_id: '123e456',
                criteria: 'This test should fail'
            })
        }).rejects.toThrow('Parameter id is not a valid UUID');
    });

    it('should throw an error if the criteria is null', async () => {
        await expect(async () => {
            new Criteria({
                id: '123e4567-e89b-12d3-a456-426614174000',
                project_id: "123e4567-e89b-12d3-a456-426614174000",
                criteria: null
            })
        }).rejects.toThrow('Parameter criteria is required');
    });

    it('should throw an error if the criteria is not a string', async () => {
        await expect(async () => {
            new Criteria({
                id: '123e4567-e89b-12d3-a456-426614174000',
                project_id: "123e4567-e89b-12d3-a456-426614174000",
                criteria: 123
            })
        }).rejects.toThrow("Parameter criteria is not a string")
    });
});
