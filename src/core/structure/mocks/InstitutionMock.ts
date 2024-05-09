import { Institution } from "../entities/Institution";


export class InstitutionMock {
    public institutions: Institution[];

    constructor() {
        this.institutions = [
            new Institution({
                id: "1c92b625-eb2a-4e56-8d9b-99e3c4a93b58",
                name: "Example University",
                email: "example@example.com",
                description: "Example University is a great university",
                country: "CountryName",
                social_medias: [{
                    media: "Twitter",
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
                email: "another@example.com",
                description: "Another University is a great university in another country",
                country: "AnotherCountry",
                social_medias: [{
                    media: "Facebook",
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