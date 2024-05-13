import { it, describe, expect } from 'vitest';
import { EntityError } from '../../../../src/core/helpers/errors/EntityError';
import { Institution } from "../../../../src/core/structure/entities/Institution";
import { SocialMediaMock } from '../../../../src/core/structure/mocks/SocialMediaMock';
import { Country } from '../../../../src/core/structure/entities/Country';
import { CountryMock } from '../../../../src/core/structure/mocks/CountryMock';


const socialMedia = new SocialMediaMock().social_medias;
const country = new CountryMock().countries;

describe('Institution', () => {
    it('should throw an error if id is null', async () => {
        await expect(async () => {
            new Institution({
                id: null,
                name: 'Test',
                email: 'test@example.com',
                countries: [country[0]],
                images: ['image1.jpg', 'image2.jpg'],
                social_medias: [
                    {media: socialMedia[0], link: 'twitter.com'}
                ]
            });
        }).rejects.toThrow("Parameter id is required");
    });

    it('should throw an error if id is not a string', async () => {
        await expect(async () => {
            new Institution({
                id: 123,
                name: 'Test',
                email: 'test@example.com',
                countries: [country[0]],
                images: ['image1.jpg', 'image2.jpg'],
                social_medias: [{
                    media: socialMedia[0],
                    link: 'twitter.com'
                }]
            });
        }).rejects.toThrow("Parameter id must be a string");
    });

    it('should throw an error if id length is not 36', async () => {
        await expect(async () => {
            new Institution({
                id: 'invalid_id_length',
                name: 'Test',
                email: 'test@example.com',
                countries: [country[0]],
                images: ['image1.jpg', 'image2.jpg'],
                social_medias: [{
                    media: 'twitter',
                    link: 'twitter.com'
                }]
            });
        }).rejects.toThrow("Parameter id is not a valid UUID");
    });

    it('should not throw an error if id is valid', async () => {
        await expect(async () => {
            new Institution({
                id: '123e4567-e89b-12d3-a456-426614174000',
                name: 'Test',
                email: 'test@example.com',
                countries: [country[0]],
                images: ['image1.jpg', 'image2.jpg'],
                social_medias: [{
                    media: 'twitter',
                    link: 'twitter.com'
                }]
            });
        }).not.toThrow();
    });
});

describe('validate_set_name', () => {
    it('should throw an error if name is null', async () => {
        await expect(async () => {
            new Institution({
                id: '123e4567-e89b-12d3-a456-426614174000',
                name: null,
                email: 'test@example.com',
                countries: [country[0]],
                images: ['image1.jpg', 'image2.jpg'],
                social_medias: [{
                    media: 'twitter',
                    link: 'twitter.com'
                }]
            });
        }).rejects.toThrow("Parameter name is required");
    });

    it('should throw an error if name is an empty string', async () => {
        await expect(async () => {
            new Institution({
                id: '123e4567-e89b-12d3-a456-426614174000',
                name: '',
                email: 'test@example.com',
                countries: [country[0]],
                images: ['image1.jpg', 'image2.jpg'],
                social_medias: [{
                    media: 'twitter',
                    link: 'twitter.com'
                }]
            });
        }).rejects.toThrow("Parameter name is required");
    });

    it('should throw an error if name is not a string', async () => {
        await expect(async () => {
            new Institution({
                id: '123e4567-e89b-12d3-a456-426614174000',
                name: 123,
                email: 'test@example.com',
                countries: [country[0]],
                images: ['image1.jpg', 'image2.jpg'],
                social_medias: [{
                    media: 'twitter',
                    link: 'twitter.com'
                }]
            });
        }).rejects.toThrow("Parameter name must be a string");
    });

    it('should not throw an error if name is valid', async () => {
        await expect(async () => {
            new Institution({
                id: '123e4567-e89b-12d3-a456-426614174000',
                name: 'Test',
                email: 'test@example.com',
                countries: [country[0]],
                images: ['image1.jpg', 'image2.jpg'],
                social_medias: [{
                    media: 'twitter',
                    link: 'twitter.com'
                }]
            });
        }).not.toThrow();
    });
});

describe('validate_set_email', () => {
    it('should throw an error if email is null', async () => {
        await expect(async () => {
            new Institution({
                id: '123e4567-e89b-12d3-a456-426614174000',
                name: 'Test',
                email: null,
                countries: [country[0]],
                images: ['image1.jpg', 'image2.jpg'],
                social_medias: [{
                    media: 'twitter',
                    link: 'twitter.com'
                }]
            });
        }).rejects.toThrow("Parameter email is required");
    });

    it('should throw an error if email is an empty string', async () => {
        await expect(async () => {
            new Institution({
                id: '123e4567-e89b-12d3-a456-426614174000',
                name: 'Test',
                email: '',
                countries: [country[0]],
                images: ['image1.jpg', 'image2.jpg'],
                social_medias: [{
                    media: 'twitter',
                    link: 'twitter.com'
                }]
            });
        }).rejects.toThrow("Parameter email is required");
    });

    it('should throw an error if email is not a string', async () => {
        await expect(async () => {
            new Institution({
                id: '123e4567-e89b-12d3-a456-426614174000',
                name: 'Test',
                email: 123,
                countries: [country[0]],
                images: ['image1.jpg', 'image2.jpg'],
                social_medias: [{
                    media: 'twitter',
                    link: 'twitter.com'
                }]
            });
        }).rejects.toThrow("Parameter email must be a string");
    });

    it('should throw an error if email format is invalid', async () => {
        await expect(async () => {
            new Institution({
                id: '123e4567-e89b-12d3-a456-426614174000',
                name: 'Test',
                email: 'invalid_email_format',
                countries: [country[0]],
                images: ['image1.jpg', 'image2.jpg'],
                social_medias: [{
                    media: 'twitter',
                    link: 'twitter.com'
                }]
            });
        }).rejects.toThrow("Invalid email format");
    });

    it('should not throw an error if email format is valid', async () => {
        await expect(async () => {
            new Institution({
                id: '123e4567-e89b-12d3-a456-426614174000',
                name: 'Test',
                email: 'test@example.com',
                countries: [country[0]],
                images: ['image1.jpg', 'image2.jpg'],
                social_medias: [{
                    media: 'twitter',
                    link: 'twitter.com'
                }]
            });
        }).not.toThrow();
    });
});

describe('validate_set_country', () => {
    it('should throw an error if country is null', async () => {
        await expect(async () => {
            new Institution({
                id: '123e4567-e89b-12d3-a456-426614174000',
                name: 'Test',
                email: 'test@example.com',
                description: 'Test Description',
                countries: null,
                images: ['image1.jpg', 'image2.jpg'],
                social_medias: [{
                    media: socialMedia[0],
                    link: 'twitter.com'
                }]
            });
        }).rejects.toThrow("Parameter countries is required");
    });

    it('should throw an error if country is an empty string', async () => {
        await expect(async () => {
            new Institution({
                id: '123e4567-e89b-12d3-a456-426614174000',
                name: 'Test',
                email: 'test@example.com',
                country: '',
                images: ['image1.jpg', 'image2.jpg'],
                social_medias: [{
                    media: 'twitter',
                    link: 'twitter.com'
                }]
            });
        }).rejects.toThrow("Parameter countries is required");
    });

    it('should throw an error if country is not a string', async () => {
        await expect(async () => {
            new Institution({
                id: '123e4567-e89b-12d3-a456-426614174000',
                name: 'Test',
                email: 'test@example.com',
                country: 123,
                images: ['image1.jpg', 'image2.jpg'],
                social_medias: [{
                    media: 'twitter',
                    link: 'twitter.com'
                }]
            });
        }).rejects.toThrow("Parameter countries is required");
    });

    it('should not throw an error if country is valid', async () => {
        await expect(async () => {
            new Institution({ 
                id: '123e4567-e89b-12d3-a456-426614174000',
                name: 'Test',
                email: 'test@example.com',
                countries: [country[0]],
                images: ['image1.jpg', 'image2.jpg'],
                social_medias: [{
                    media: 'twitter',
                    link: 'twitter.com'
                }]
            });
        }).not.toThrow();
    });
});

describe('validate_set_images', () => {
    it('should throw an error if images is null', async () => {
        await expect(async () => {
            new Institution({
                id: '123e4567-e89b-12d3-a456-426614174000',
                name: 'Test',
                email: 'test@example.com',
                countries: [country[0]],
                images: null,
                social_medias: [{
                    media: 'twitter',
                    link: 'twitter.com'
                }]
            });
        }).rejects.toThrow("Parameter images must be an array of strings");
    });

    it('should throw an error if images contains non-string elements', async () => {
        await expect(async () => {
            new Institution({
                id: '123e4567-e89b-12d3-a456-426614174000',
                name: 'Test',
                email: 'test@example.com',
                countries: [country[0]],
                images: [123, true, {}],
                social_medias: [{
                    media: 'twitter',
                    link: 'twitter.com'
                }]
            });
        }).rejects.toThrow("Each image in the images array must be a string");
    });

    it('should not throw an error if images is valid', async () => {
        await expect(async () => {
            new Institution({
                id: '123e4567-e89b-12d3-a456-426614174000',
                name: 'Test',
                email: 'test@example.com',
                countries: [country[0]],
                images: ['image1.jpg', 'image2.jpg'],
                social_medias: [{
                    media: 'twitter',
                    link: 'twitter.com'
                }]
            });
        }).not.toThrow();
    });
}); 