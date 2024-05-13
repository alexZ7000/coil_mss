import { CountryProps } from "./CountryDTO";
import { SocialMediaProps } from "./SocialMediaDTO";
import { Country } from "../../../structure/entities/Country";
import { Institution } from "../../../structure/entities/Institution";
import { SocialMedia } from "../../../structure/entities/SocialMedia";


class InstitutionProps {
    id: string;
    name: string;
    description: string;
    email: string;
    countries: { contry: CountryProps }[];
    social_medias: { media: SocialMediaProps, link: string }[];
    images?: { id: number, institution_id: string, image: string }[];
}

class InstitutionDTO {
    public to_entity(institution: InstitutionProps): Institution {
        return new Institution({
            id: institution.id,
            name: institution.name,
            description: institution.description,
            email: institution.email,
            countries: institution.countries.map(country => {
                return new Country({
                    id: country.contry.id,
                    country: country.contry.country,
                    country_code: country.contry.country_code
                });
            }),
            social_medias: institution.social_medias.map(social_media => {
                return {
                    media: new SocialMedia({
                        id: social_media.media.id,
                        social_media: social_media.media.name
                    }),
                    link: social_media.link
                };
            }),
            images: institution.images ? institution.images.map(img => {
                return img.image;
            }) : [],
        });
    }
}

export { InstitutionDTO, InstitutionProps };