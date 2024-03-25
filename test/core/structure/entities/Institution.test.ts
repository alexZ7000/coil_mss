import { it, describe, expect } from 'vitest';
import { EntityError } from '../../../../src/core/helpers/errors/EntityError';
import { Institution } from "../../../../src/core/structure/entities/Institution";


describe('Institution', () => {
    describe('validate_set_id', () => {
        it('should throw an error if id is null', () => {
            expect(() => {
                new Institution({
                    id: null,
                    name: 'Test',
                    email: 'test@example.com',
                    country: 'Test Country',
                    social_medias: {
                        media: 'twitter',
                        link: 'twitter.com'
                    }
                });
            }).toThrow(EntityError);
        });

        it('should throw an error if id is not a string', () => {
            expect(() => {
                new Institution({
                    id: 123,
                    name: 'Test',
                    email: 'test@example.com',
                    country: 'Test Country',
                    social_medias: {
                        media: 'twitter',
                        link: 'twitter.com'
                    }
                });
            }).toThrow(EntityError);
        });

        it('should throw an error if id length is not 36', () => {
            expect(() => {
                new Institution({
                    id: 'invalid_id_length',
                    name: 'Test',
                    email: 'test@example.com',
                    country: 'Test Country',
                    social_medias: {
                        media: 'twitter',
                        link: 'twitter.com'
                    }
                });
            }).toThrow(EntityError);
        });

        it('should not throw an error if id is valid', () => {
            expect(() => {
                new Institution({
                    id: '123e4567-e89b-12d3-a456-426614174000',
                    name: 'Test',
                    email: 'test@example.com',
                    country: 'Test Country',
                    social_medias: {
                        media: 'twitter',
                        link: 'twitter.com'
                    }
                });
            }).not.toThrow();
        });
    });

    describe('validate_set_name', () => {
        it('should throw an error if name is null', () => {
            expect(() => {
                new Institution({
                    id: '123e4567-e89b-12d3-a456-426614174000',
                    name: null,
                    email: 'test@example.com',
                    country: 'Test Country',
                    social_medias: {
                        media: 'twitter',
                        link: 'twitter.com'
                    }
                });
            }).toThrow(EntityError);
        });

        it('should throw an error if name is an empty string', () => {
            expect(() => {
                new Institution({
                    id: '123e4567-e89b-12d3-a456-426614174000',
                    name: '',
                    email: 'test@example.com',
                    country: 'Test Country',
                    social_medias: {
                        media: 'twitter',
                        link: 'twitter.com'
                    }
                });
            }).toThrow(EntityError);
        });

        it('should throw an error if name is not a string', () => {
            expect(() => {
                new Institution({
                    id: '123e4567-e89b-12d3-a456-426614174000',
                    name: 123,
                    email: 'test@example.com',
                    country: 'Test Country',
                    social_medias: {
                        media: 'twitter',
                        link: 'twitter.com'
                    }
                });
            }).toThrow(EntityError);
        });

        it('should not throw an error if name is valid', () => {
            expect(() => {
                new Institution({
                    id: '123e4567-e89b-12d3-a456-426614174000',
                    name: 'Test',
                    email: 'test@example.com',
                    country: 'Test Country',
                    social_medias: {
                        media: 'twitter',
                        link: 'twitter.com'
                    }
                });
            }).not.toThrow();
        });
    });
    describe('validate_set_email', () => {
        it('should throw an error if email is null', () => {
            expect(() => {
                new Institution({
                    id: '123e4567-e89b-12d3-a456-426614174000',
                    name: 'Test',
                    email: null,
                    country: 'Test Country',
                    social_medias: {
                        media: 'twitter',
                        link: 'twitter.com'
                    }
                });
            }).toThrow(EntityError);
        });
    
        it('should throw an error if email is an empty string', () => {
            expect(() => {
                new Institution({
                    id: '123e4567-e89b-12d3-a456-426614174000',
                    name: 'Test',
                    email: '',
                    country: 'Test Country',
                    social_medias: {
                        media: 'twitter',
                        link: 'twitter.com'
                    }
                });
            }).toThrow(EntityError);
        });
    
        it('should throw an error if email is not a string', () => {
            expect(() => {
                new Institution({
                    id: '123e4567-e89b-12d3-a456-426614174000',
                    name: 'Test',
                    email: 123,
                    country: 'Test Country',
                    social_medias: {
                        media: 'twitter',
                        link: 'twitter.com'
                    }
                });
            }).toThrow(EntityError);
        });
    
        it('should throw an error if email format is invalid', () => {
            expect(() => {
                new Institution({
                    id: '123e4567-e89b-12d3-a456-426614174000',
                    name: 'Test',
                    email: 'invalid_email_format',
                    country: 'Test Country',
                    social_medias: {
                        media: 'twitter',
                        link: 'twitter.com'
                    }
                });
            }).toThrow(EntityError);
        });
    
        it('should not throw an error if email format is valid', () => {
            expect(() => {
                new Institution({
                    id: '123e4567-e89b-12d3-a456-426614174000',
                    name: 'Test',
                    email: 'test@example.com',
                    country: 'Test Country',
                    social_medias: {
                        media: 'twitter',
                        link: 'twitter.com'
                    }
                });
            }).not.toThrow();
        });
    });
    
    describe('validate_set_country', () => {
        it('should throw an error if country is null', () => {
            expect(() => {
                new Institution({
                    id: '123e4567-e89b-12d3-a456-426614174000',
                    name: 'Test',
                    email: 'test@example.com',
                    country: null,
                    social_medias: {
                        media: 'twitter',
                        link: 'twitter.com'
                    }
                });
            }).toThrow(EntityError);
        });
    
        it('should throw an error if country is an empty string', () => {
            expect(() => {
                new Institution({
                    id: '123e4567-e89b-12d3-a456-426614174000',
                    name: 'Test',
                    email: 'test@example.com',
                    country: '',
                    social_medias: {
                        media: 'twitter',
                        link: 'twitter.com'
                    }
                });
            }).toThrow(EntityError);
        });
    
        it('should throw an error if country is not a string', () => {
            expect(() => {
                new Institution({
                    id: '123e4567-e89b-12d3-a456-426614174000',
                    name: 'Test',
                    email: 'test@example.com',
                    country: 123,
                    social_medias: {
                        media: 'twitter',
                        link: 'twitter.com'
                    }
                });
            }).toThrow(EntityError);
        });
    
        it('should not throw an error if country is valid', () => {
            expect(() => {
                new Institution({
                    id: '123e4567-e89b-12d3-a456-426614174000',
                    name: 'Test',
                    email: 'test@example.com',
                    country: 'Test Country',
                    social_medias: {
                        media: 'twitter',
                        link: 'twitter.com'
                    }
                });
            }).not.toThrow();
        });
    });
    

});