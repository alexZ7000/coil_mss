import { CountryMock } from "./CountryMock";
import { Institution } from "../entities/Institution";
import { SocialMediaMock } from "./SocialMediaMock";


export class InstitutionMock {
    public institutions: Institution[];
    private country_mock: CountryMock = new CountryMock();

    constructor() {

        this.institutions = [
            new Institution({
                id: "1c92b625-eb2a-4e56-8d9b-99e3c4a93b58",
                name: "Example University",
                description: "This is an example university",
                email: "example@example.com",
                countries: [
                    { id: this.country_mock.countries[0].id, country: this.country_mock.countries[0] },
                    { id: this.country_mock.countries[1].id, country: this.country_mock.countries[1] }
                ],
                social_medias: [{
                    id: new SocialMediaMock().social_medias.find(social_media => social_media.social_media == "Facebook")!.id,
                    media: new SocialMediaMock().social_medias.find(social_media => social_media.social_media == "Twitter")!,
                    link: "https://twitter.com/example"
                }],
                images: [
                    "https://example.com/image1.jpg",
                    "https://example.com/image2.jpg"
                ]
            }),
            new Institution({
                id: "2b968d1e-df34-49db-86d7-4c69a75e07c4",
                name: "Another University",
                description: "This is another university",
                email: "another@example.com",
                countries: [
                    { id: this.country_mock.countries[0].id, country: this.country_mock.countries[0] },
                    { id: this.country_mock.countries[1].id, country: this.country_mock.countries[1] }
                ],
                social_medias: [{
                    id: new SocialMediaMock().social_medias.find(social_media => social_media.social_media == "Facebook")!.id,
                    media: new SocialMediaMock().social_medias.find(social_media => social_media.social_media == "Facebook")!,
                    link: "https://facebook.com/another"
                }],
                images: [
                    "https://another.com/image1.jpg",
                    "https://another.com/image2.jpg"
                ]
            })
        ];
    }
}