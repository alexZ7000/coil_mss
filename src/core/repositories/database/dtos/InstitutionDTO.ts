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
    countries?: { country: CountryProps }[];
    social_medias?: { media: SocialMediaProps, link: string }[];
    images?: { id: number, institution_id: string, image: string }[];
}

class InstitutionDTO {
    public to_entity(institution: InstitutionProps): Institution {
        return new Institution({
            id: institution.id,
            name: institution.name,
            description: institution.description,
            email: institution.email,
            countries: institution.countries ? institution.countries.map(country => {
                return {
                    id: country.country.id,
                    country: new Country({
                        id: country.country.id,
                        country: country.country.country,
                        country_code: country.country.country_code
                    })
                };
            }) : [],
            social_medias: institution.social_medias ? institution.social_medias.map(social_media => {
                return {
                    id: social_media.media.id,
                    media: new SocialMedia({
                        id: social_media.media.id,
                        social_media: social_media.media.name
                    }),
                    link: social_media.link
                };
            }) : [],
            images: institution.images ? institution.images.map(img => {
                return img.image;
            }) : [],
        });
    }
}

export { InstitutionDTO, InstitutionProps };