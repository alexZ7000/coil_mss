import { SocialMedia } from "../../../structure/entities/SocialMedia";

export class SocialMediaProps {
    id: number;
    name: string;
}

export class SocialMediaDTO {

    public to_entity(social_media: SocialMediaProps): SocialMedia {
        return new SocialMedia({
            id: social_media.id,
            social_media: social_media.name
        });
    }
}