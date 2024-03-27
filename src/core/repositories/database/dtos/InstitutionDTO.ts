import { Institution } from "../../../structure/entities/Institution";


class Props {
    id: string;
    name: string;
    email: string;
    country: string;
    social_medias?: {id: number, institution_id: string, media: string, link: string}[];
    images?: {id: number, institution_id: string, image: string}[];
}


export class InstitutionDTO {

    private get_image_id_from_url(url: string): number {
        let url_parts = url.split('/');
        let image_id = url_parts[url_parts.length - 1].split('.')[0];
        return parseInt(image_id);
    }

    public to_entity(course: Props): Institution {
        return new Institution({
            id: course.id,
            name: course.name,
            email: course.email,
            country: course.country,
            social_medias: course.social_medias ? course.social_medias.map(sm => {
                return {
                    id: sm.id,
                    institution_id: sm.institution_id,
                    media: sm.media,
                    link: sm.link,
                }
            }) : [],
            images: course.images ? course.images.map(img => {
                return img.image;
            }) : [],
        });
    }

    public to_database(institution: Institution): Props {
        return {
            id: institution.id,
            name: institution.name,
            email: institution.email,
            country: institution.country,
            social_medias: institution.images.length != 0 ? institution.social_medias.map(sm => {
                return {
                    id: sm.id,
                    institution_id: sm.institution_id,
                    media: sm.media,
                    link: sm.link,
                }
            }) : undefined,
            images: institution.images.length != 0 ? institution.images.map((img: string) => {
                return {
                    id: this.get_image_id_from_url(img),
                    institution_id: institution.id,
                    image: img,
                }
            }) : undefined,
        };
    }   
}