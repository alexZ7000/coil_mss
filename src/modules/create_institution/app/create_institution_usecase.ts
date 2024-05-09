import { randomUUID } from 'crypto';
import { TokenAuth } from "../../../core/helpers/functions/token_auth";
import { Institution } from "../../../core/structure/entities/Institution";
import { IUserRepo } from '../../../core/repositories/interfaces/IUserRepo';
import { ImageManager } from '../../../core/helpers/functions/image_manager';
import { IInstitutionRepo } from '../../../core/repositories/interfaces/IInstitutionRepo';
import { MissingParameter, UserNotAllowed, UserNotAuthenticated } from '../../../core/helpers/errors/ModuleError';
import { UserTypeEnum } from '../../../core/helpers/enums/UserTypeEnum';
import { UniqueConstraintError } from 'sequelize';

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
        if (!institutionData.country) {
            throw new MissingParameter("Country");
        }
        if (!institutionData.images) {
            throw new MissingParameter("Images");
        }
        let images = institutionData.images;
        images.forEach((image: string) => {
            if (!image) {
                throw new MissingParameter("Image");
            }
        });
        if (!institutionData.social_medias) {
            throw new MissingParameter("Social Medias");
        }
        const social_medias = institutionData.social_medias;
        social_medias.forEach((media: any) => {
            if (!media.media) {
                throw new MissingParameter("Media to social media");
            }
            if (!media.link) {
                throw new MissingParameter("Link to social media");
            }
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
            country: institutionData.country,
            images: institutionData.images,
            social_medias: institutionData.social_medias
        });

        images.map(async (image: string, index: number) => {
            const content_type = image.split(';')[0].split(':')[1];
            const image_key = `institution/${institution.id}/${index}.${content_type.split('/')[1]}`;
            const image_buffer = Buffer.from(image.split(',')[1], 'base64');
            institution.images[index] = await this.bucket.upload_image(image_key, image_buffer, content_type);
        });

        await this.institution_repo.create_institution(institution);
    }
}