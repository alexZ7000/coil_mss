import {it, describe, expect} from 'vitest'
import {Criteria} from '../../../../src/core/structure/entities/Criteria'
import {EntityError} from '../../../../src/core/helpers/errors/EntityError'

describe('Criteria', () => {
    describe('validate_set_id', () => {
        it('should throw an error if the id is null', () => {
            expect(() => {
                new Criteria({
                    id: null,
                    criteria: 'This test should fail'
                })
            }).toThrowError(EntityError, 'Parameter id is required');   
        });

        it('should throw an error if the id is not a string', () => {
            expect(() => {
                new Criteria({
                    id: 123,
                    criteria: 'This test should fail'
                })
            }).toThrowError(EntityError, 'Parameter id is not a string');   
        });

        it('should throw an error if the id is not a valid UUID', () => {
            expect(() => {
                new Criteria({
                    id: 'invalid-uuid',
                    criteria: 'This test should fail'
                })
            }).toThrowError(EntityError, 'Parameter id is not a valid UUID');   
        });
    });

    describe('validate_set_criteria', () => {
        it('should throw an error if the criteria is null', () => {
            expect(() => {
                new Criteria({
                    id: '123e4567-e89b-12d3-a456-426614174000',
                    criteria: null
                })
            }).toThrowError(EntityError, 'Parameter criteria is required');   
        });

        it('should throw an error if the criteria is not a string', () => {
            expect(() => {
                new Criteria({
                    id: '123e4567-e89b-12d3-a456-426614174000',
                    criteria: 123
                })
            }).toThrowError(EntityError, 'Parameter criteria is not a string');   
        });
    });
});