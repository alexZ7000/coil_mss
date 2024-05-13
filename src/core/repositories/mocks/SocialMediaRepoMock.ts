import { ISocialMediaRepo } from "../interfaces/ISocialMediaRepo";
import { SocialMedia } from "../../structure/entities/SocialMedia";
import { SocialMediaMock } from "../../structure/mocks/SocialMediasMock";


export class SocialMediaRepoMock implements ISocialMediaRepo {
    private socialmedia_mock: SocialMediaMock

    constructor() { 
        this.socialmedia_mock = new SocialMediaMock();
    }

    public async get_all_social_media(): Promise<SocialMedia[]> {
        return this.socialmedia_mock.social_medias;
    }
}