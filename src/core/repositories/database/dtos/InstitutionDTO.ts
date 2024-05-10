import { Institution } from "../../../structure/entities/Institution";


class InstitutionProps {
    id: string;
    name: string;
    description: string;
    email: string;
    country: string;
    social_medias?: {id: number, institution_id: string, media: string, link: string}[];
    images?: {id: number, institution_id: string, image: string}[];
}

class InstitutionDTO {
    public to_entity(institution: InstitutionProps): Institution {
        return new Institution({
            id: institution.id,
            name: institution.name,
            description: institution.description,
            email: institution.email,
            country: institution.country,
            social_medias: institution.social_medias ? institution.social_medias.map(sm => {
                return {
                    media: sm.media,
                    link: sm.link,
                }
            }) : [],
            images: institution.images ? institution.images.map(img => {
                return img.image;
            }) : [],
        });
    }
}

export { InstitutionDTO, InstitutionProps };