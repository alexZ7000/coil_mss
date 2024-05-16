import { SocialMedia } from "../../structure/entities/SocialMedia";

export interface ISocialMediaRepo {
    get_all_social_media(): Promise<SocialMedia[]>;
}