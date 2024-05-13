import { SocialMediaDTO } from "../dtos/SocialMediaDTO";
import { SocialMedia as SocialMediaDB } from "../models/Models";
import { ISocialMediaRepo } from "../../interfaces/ISocialMediaRepo";
import { SocialMedia } from "../../../structure/entities/SocialMedia";


export class SocialMediaRepo implements ISocialMediaRepo {
    private socialmediaDTO: SocialMediaDTO;

    constructor() {
        this.socialmediaDTO = new SocialMediaDTO();
    }

    public async get_all_social_media(): Promise<SocialMedia[]> {
        const social_media = await SocialMediaDB.findAll();
        return social_media.map(social_media => this.socialmediaDTO.to_entity(social_media.toJSON()));
    }
}
