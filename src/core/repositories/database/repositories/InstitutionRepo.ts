import { InstitutionDTO } from "../dtos/InstitutionDTO";
import { IInstitutionRepo } from "../../interfaces/IInstitutionRepo";
import { Institution } from "../../../structure/entities/Institution";
import { Institution as InstitutionDB, InstitutionImage as InstitutionImageDB, InstitutionSocialMedia as InstitutionSocialMediaDB } from "../models/Models";


export class InstitutionRepo implements IInstitutionRepo {
    private institutionDTO: InstitutionDTO;

    constructor() {
        this.institutionDTO = new InstitutionDTO();
    }

    public async check_institution_exists_by_name(name: string): Promise<boolean> {
        let institution_found = await InstitutionDB.findOne({
            where: {
                name: name
            }
        });

        return institution_found ? true : false;
    }

    public async get_all_institutions(): Promise<Institution[]> {
        let institutions_found = await InstitutionDB.findAll({
            include: [
                { model: InstitutionImageDB, as: 'images', order: [['id', 'ASC']], limit: 1 },
            ]
        });

        return institutions_found.map(institution => {
            return this.institutionDTO.to_entity(institution.toJSON());
        });
    }

    public async create_institution(institution: Institution): Promise<boolean> {
        let institution_created = await InstitutionDB.create({
            id: institution.id,
            name: institution.name,
            description: institution.description,
            email: institution.email,
            country: institution.country
        });
        await InstitutionSocialMediaDB.bulkCreate(institution.social_medias.map((sm: { media: string; link: string; }) => {
            return {
                institution_id: institution.id,
                media: sm.media,
                link: sm.link
            }
        }));
        await InstitutionImageDB.bulkCreate(institution.images.map((img: string) => {
            return {
                institution_id: institution.id,
                image: img
            }
        }));

        return institution_created ? true : false;
    }

    public async update_institution(institution: Institution): Promise<boolean> {
        await InstitutionDB.update({
            name: institution.name,
            description: institution.description,
            email: institution.email,
            country: institution.country
        }, {
            where: {
                id: institution.id
            }
        });
        await InstitutionSocialMediaDB.destroy({
            where: {
                institution_id: institution.id
            }
        });
        await InstitutionImageDB.destroy({
            where: {
                institution_id: institution.id
            }
        });
        await InstitutionSocialMediaDB.bulkCreate(institution.social_medias.map((sm: { media: string; link: string; }) => {
            return {
                institution_id: institution.id,
                media: sm.media,
                link: sm.link
            }
        }));
        await InstitutionImageDB.bulkCreate(institution.images.map((img: string) => {
            return {
                institution_id: institution.id,
                image: img
            }
        }));

        return true;
    }

    public async delete_institution(id: string): Promise<boolean> {
        let institution_deleted = await InstitutionDB.destroy({
            where: {
                id: id
            }
        });

        return institution_deleted ? true : false;
    }

    public async get_institution(id: string): Promise<Institution | null> {
        let institution_found = await InstitutionDB.findOne({
            where: {
                id: id
            },
            include: [
                { model: InstitutionSocialMediaDB, as: 'social_medias' },
                { model: InstitutionImageDB, as: 'images' },
            ]
        });

        return institution_found ? this.institutionDTO.to_entity(institution_found.toJSON()) : null;
    }
}
