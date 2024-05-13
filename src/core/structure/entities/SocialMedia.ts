export class SocialMedia {
    public id: number;
    public social_media: string;

    constructor(social_media: { id: number, social_media: string }) {
        this.id = social_media.id;
        this.social_media = social_media.social_media;
    }
}