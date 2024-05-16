import { randomUUID } from 'crypto';
import { UniqueConstraintError } from 'sequelize';
import { TokenAuth } from "../../../core/helpers/functions/token_auth";
import { UserTypeEnum } from '../../../core/helpers/enums/UserTypeEnum';
import { Institution } from "../../../core/structure/entities/Institution";
import { IUserRepo } from '../../../core/repositories/interfaces/IUserRepo';
import { ImageManager } from '../../../core/helpers/functions/image_manager';
import { IInstitutionRepo } from '../../../core/repositories/interfaces/IInstitutionRepo';
import { InvalidParameter, MissingParameter, UserNotAllowed, UserNotAuthenticated } from '../../../core/helpers/errors/ModuleError';

export class CreateInstitutionUsecase {
    public token_auth: TokenAuth;
    public bucket: ImageManager;
    public user_repo: IUserRepo;
    public institution_repo: IInstitutionRepo;

    constructor(institution_repo: IInstitutionRepo, user_repo: IUserRepo) {
        this.token_auth = new TokenAuth();
        this.bucket = new ImageManager();
        this.institution_repo = institution_repo;
        this.user_repo = user_repo;
    }

    public async execute(institutionData: any, headers: any) {
        if (!headers.Authorization) {
            throw new MissingParameter("Authorization");
        }
        if (!institutionData) {
            throw new MissingParameter("Institution Data");
        }
        if (!institutionData.name) {
            throw new MissingParameter("Name");
        }
        if (!institutionData.description) {
            throw new MissingParameter("Description");
        }
        if (!institutionData.email) {
            throw new MissingParameter("Email");
        }
        if (!institutionData.countries) {
            throw new MissingParameter("Countries");
        }
        if (!institutionData.images) {
            throw new MissingParameter("Images");
        }

        const images = institutionData.images;
        if (!Array.isArray(images)) {
            throw new InvalidParameter("Images", "must be an array");
        }
        images.forEach((image: string) => {
            if (!image) {
                throw new MissingParameter("Image");
            }
            if (typeof image !== 'string') {
                throw new InvalidParameter("Image", "must be a string");
            }
            if (!image.includes('data:image')) {
                throw new InvalidParameter("Image", "must be a base64 image");
            }
            const allowedImageTypes = ['jpg', 'jpeg', 'png'];
            const imageExtension = image.split(';')[0].split(':')[1].split('/')[1];
            if (!allowedImageTypes.includes(imageExtension)) {
                throw new InvalidParameter("Image", "must be a valid image type (jpg, jpeg, png)");
            }
        });

        const social_medias = institutionData.social_medias;
        if (!Array.isArray(social_medias)) {
            throw new InvalidParameter("Social Medias", "must be an array");
        }
        social_medias.forEach((social_media: { id: number, link: string }) => {
            if (!social_media.id) {
                throw new MissingParameter("Social Media Id");
            }
            if (!social_media.link) {
                throw new MissingParameter("Social Media Link");
            }
            if (typeof social_media.id !== 'number') {
                throw new InvalidParameter("Social Media Id", "must be a number");
            }
            if (typeof social_media.link !== 'string') {
                throw new InvalidParameter("Social Media Link", "must be a string");
            }
        });

        if (!Array.isArray(institutionData.countries)) {
            throw new InvalidParameter("Countries", "must be an array of country_ids");
        }
        const countries = institutionData.countries.map((country_id: number) => {
            return { id: country_id };
        });

        const user_id = await this.token_auth
            .decode_token(headers.Authorization)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw new UserNotAuthenticated("Invalid or expired token");
            });

        const user = await this.user_repo.get_user(user_id);
        if (!user) {
            throw new UserNotAuthenticated();
        }

        if (user.user_type === UserTypeEnum.STUDENT) {
            throw new UserNotAllowed();
        }

        const institution_exists = await this.institution_repo.check_institution_exists_by_name(institutionData.name);
        if (institution_exists) {
            throw new UniqueConstraintError({
                message: "Institution already exists"
            });
        }

        const institution = new Institution({
            id: randomUUID(),
            name: institutionData.name,
            description: institutionData.description,
            email: institutionData.email,
            countries: countries,
            images: images,
            social_medias: social_medias
        });

        if (process.env.STAGE !== 'test') {
            images.map(async (image: string, index: number) => {
                const content_type = image.split(';')[0].split(':')[1];
                const image_key = `institution/${institution.id}/${index}.${content_type.split('/')[1]}`;
                const image_buffer = Buffer.from(image.split(',')[1], 'base64');
                institution.images[index] = await this.bucket.upload_image(image_key, image_buffer, content_type);
            });
        }

        await this.institution_repo.create_institution(institution);
        
        return { id: institution.id };
    }
}