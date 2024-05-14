import { InstitutionDTO } from "../dtos/InstitutionDTO";
import { IInstitutionRepo } from "../../interfaces/IInstitutionRepo";
import { Institution } from "../../../structure/entities/Institution";
import {
    InstitutionCountry, Institution as InstitutionDB, InstitutionImage as InstitutionImageDB,
    InstitutionSocialMedia as InstitutionSocialMediaDB, Country as CountryDB, SocialMedia as SocialMediaDB
} from "../models/Models";
import { Country } from "../../../structure/entities/Country";
import { SocialMedia } from "../../../structure/entities/SocialMedia";


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

    public async get_all_institutions_names(): Promise<{ id: string, name: string }[]> {
        const institutions_found = await InstitutionDB.findAll({
            attributes: ['id', 'name']
        });

        return institutions_found.map(institution => {
            let institution_json = institution.toJSON();
            return {
                id: institution_json.id,
                name: institution_json.name
            };
        });
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
            email: institution.email
        });

        await InstitutionCountry.bulkCreate(institution.countries.map((country: { id: number, country?: Country }) => {
            return {
                institution_id: institution.id,
                country_id: country.id
            }
        }));

        await InstitutionSocialMediaDB.bulkCreate(institution.social_medias.map((sm: { id: number, media?: SocialMedia, link: string }) => {
            return {
                institution_id: institution.id,
                social_media_id: sm.id,
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

        await InstitutionCountry.destroy({
            where: {
                institution_id: institution.id
            }
        });

        await InstitutionSocialMediaDB.bulkCreate(institution.social_medias.map((sm: { id: number, media?: SocialMedia, link: string }) => {
            return {
                institution_id: institution.id,
                media: sm.media,
                link: sm.link
            }
        }));

        await InstitutionCountry.bulkCreate(institution.countries.map((country: { id: number, country?: Country }) => {
            return {
                institution_id: institution.id,
                country_id: country.id
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
                { model: InstitutionSocialMediaDB, as: 'social_medias', include: [{ model: SocialMediaDB, as: 'media' }] },
                { model: InstitutionImageDB, as: 'images' },
                { model: InstitutionCountry, as: 'countries', include: [{ model: CountryDB, as: 'country' }] }
            ]
        });

        return institution_found ? this.institutionDTO.to_entity(institution_found.toJSON()) : null;
    }
}
