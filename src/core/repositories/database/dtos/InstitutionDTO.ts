import { Institution } from "../../../structure/entities/Institution";


class Props {
    id: string;
    name: string;
    description: string;
    email: string;
    country: string;
    InstitutionSocialMedia?: {id: number, institution_id: string, media: string, link: string}[];
    InstitutionImage?: {id: number, institution_id: string, image: string}[];
}


export class InstitutionDTO {

    public to_entity(course: Props): Institution {
        return new Institution({
            id: course.id,
            name: course.name,
            description: course.description,
            email: course.email,
            country: course.country,
            social_medias: course.InstitutionSocialMedia ? course.InstitutionSocialMedia.map(sm => {
                return {
                    id: sm.id,
                    institution_id: sm.institution_id,
                    media: sm.media,
                    link: sm.link,
                }
            }) : [],
            images: course.InstitutionImage ? course.InstitutionImage.map(img => {
                return img.image;
            }) : [],
        });
    }
}