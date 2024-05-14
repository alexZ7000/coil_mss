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

    it('should set the id property', async () => {
        const criteria = new Criteria({
            id: 1,
            criteria: 'This test should pass'
        });

        expect(criteria.id).toBe(1);
    });

    it('should throw an error if the criteria is less than 3 characters', async () => {
        await expect(async () => {
            new Criteria({
                id: 1,
                criteria: 'CS'
            })
        }).rejects.toThrow('Parameter criteria must be between 3 and 255 characters');
    });
});
  