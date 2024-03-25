import { Institution } from "../entities/Institution";

export function createMockValidInstitution(): Institution {
    return new Institution({
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Test Institution',
        email: 'test@example.com',
        country: 'Test Country',
        social_medias: {
            media: 'twitter',
            link: 'twitter.com/testinstitution'
        }
    });
}

export function createMockInvalidIdInstitution(): Institution {
    return new Institution({
        id: 'invalid_id_length',
        name: 'Test Institution',
        email: 'test@example.com',
        country: 'Test Country',
        social_medias: {
            media: 'twitter',
            link: 'twitter.com/testinstitution'
        }
    });
}




