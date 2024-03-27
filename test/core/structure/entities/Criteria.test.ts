import { it, describe, expect } from 'vitest'
import { Criteria } from '../../../../src/core/structure/entities/Criteria'


describe('Criteria', () => {
    it('should throw an error if the id is null', async () => {
        await expect(async () => {
            new Criteria({
                id: null,
                criteria: 'This test should fail'
            })
        }).rejects.toThrow('Parameter id is required');
    });

    it('should throw an error if the id is not a number', async () => {
        await expect(async () => {
            new Criteria({
                id: "",
                criteria: 'This test should fail'
            })
        }).rejects.toThrow('Parameter id is not a number');
    });

    it('should throw an error if the criteria is null', async () => {
        await expect(async () => {
            new Criteria({
                id: 2,
                criteria: null
            })
        }).rejects.toThrow('Parameter criteria is required');
    });

    it('should throw an error if the criteria is not a string', async () => {
        await expect(async () => {
            new Criteria({
                id: 3,
                criteria: 123
            })
        }).rejects.toThrow("Parameter criteria is not a string")
    });
});
