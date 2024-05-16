import { SocialMedia } from '../entities/SocialMedia';

export class SocialMediaMock {
    public social_medias: SocialMedia[];

    constructor() {
        this.social_medias = [
            new SocialMedia({ id: 1, social_media: "Facebook" }),
            new SocialMedia({ id: 2, social_media: "Instagram" }),
            new SocialMedia({ id: 3, social_media: "Twitter" }),
            new SocialMedia({ id: 4, social_media: "LinkedIn" }),
            new SocialMedia({ id: 5, social_media: "YouTube" }),
            new SocialMedia({ id: 6, social_media: "Website" }),
        ];
    }
}