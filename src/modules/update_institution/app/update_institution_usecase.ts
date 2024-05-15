import {
  InvalidRequest,
  InvalidParameter,
  MissingParameter,
  UserNotAllowed,
  UserNotAuthenticated,
} from "../../../core/helpers/errors/ModuleError";
import { UniqueConstraintError } from "sequelize";
import { TokenAuth } from "../../../core/helpers/functions/token_auth";
import { NotFoundError } from "../../../core/helpers/errors/RepoError";
import { UserTypeEnum } from '../../../core/helpers/enums/UserTypeEnum';
import { IUserRepo } from "../../../core/repositories/interfaces/IUserRepo";
import { ImageManager } from "../../../core/helpers/functions/image_manager";
import { IInstitutionRepo } from "../../../core/repositories/interfaces/IInstitutionRepo";

export class UpdateInstitutionUsecase {
  public bucket: ImageManager;
  public token_auth: TokenAuth;
  public user_repo: IUserRepo;
  public institution_repo: IInstitutionRepo;

  constructor(institution_repo: IInstitutionRepo, user_repo: IUserRepo) {
    this.token_auth = new TokenAuth();
    this.bucket = new ImageManager();
    this.institution_repo = institution_repo;
    this.user_repo = user_repo;
  }

  //To do: 
  public async execute(
    headers: { [key: string]: any },
    body: { [key: string]: any }
  ) {
    if (!headers) {
      throw new InvalidRequest("Headers");
    }
    if (!body) {
      throw new InvalidRequest("Body");
    }
    if (!headers.Authorization) {
      throw new MissingParameter("Authorization");
    }
    if (!body.institution_id) {
      throw new MissingParameter("Missing institution_id");
    }

    const user_id = await this.token_auth.decode_token(headers.Authorization)
      .then(response => {
        return response;
      }).catch(error => {
        throw new UserNotAuthenticated("Invalid or expired token");
      });

    const user = await this.user_repo.get_user(user_id);
    if (!user) {
      throw new UserNotAuthenticated();
    }
    if (!([UserTypeEnum.ADMIN, UserTypeEnum.MODERATOR].includes(user.user_type))) {
      throw new UserNotAllowed();
    }

    const institution = await this.institution_repo.get_institution(body.institution_id)
    if (!institution) {
      throw new NotFoundError("Institution not found");
    }

    if (body.name) {
      const institution_exists = await this.institution_repo.check_institution_exists_by_name(body.name);
      if (institution_exists) {
        throw new UniqueConstraintError({
          message: "Institution already exists"
        });
      }
    }

    if (body.images) {
      if (!Array.isArray(body.images)) {
        throw new InvalidRequest("Images must be an array of base64 images");
      }
      body.images.forEach((image: string) => {
        if (!image) {
          throw new MissingParameter("Image");
        }
        if (typeof image !== 'string') {
          throw new InvalidParameter("Image", "must be a base64 string");
        }
        if (!image.includes('data:image')) {
          throw new InvalidParameter("Image", "must be a base64 image");
        }
        const allowedImageTypes = ['jpg', 'jpeg', 'png'];
        const imageExtension = image.split(';')[0].split(':')[1].split('/')[1];
        if (!allowedImageTypes.includes(imageExtension)) {
          throw new InvalidParameter("Image", "must be a valid image type (jpg, jpeg, png)");
        }
      }
      );
    }

    if (body.social_medias) {
      if (!Array.isArray(body.social_medias)) {
        throw new InvalidParameter("Social Medias", "must be an array");
      }
      body.social_medias.forEach((social_media: { id: number, link: string }) => {
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
    }

    if (body.countries) {
      if (!Array.isArray(body.countries)) {
        throw new InvalidRequest("Countries must be an array of country_ids");
      }
      body.countries.forEach((country_id: number) => {
        if (!country_id) {
          throw new MissingParameter("Country Id");
        }
        if (typeof country_id !== 'number') {
          throw new InvalidRequest("Country Id must be a number");
        }
      });
    }

    let countries: { id: number }[] = [];
    if (body.countries) {
      countries = body.countries.map((country_id: number) => {
        return { id: country_id };
      });
    }

    let social_medias: { id: number, link: string }[] = [];
    if (body.social_medias) {
      social_medias = body.social_medias.map((social_media: { id: number, link: string }) => {
        return {
          id: social_media.id,
          link: social_media.link
        };
      });
    }

    institution.name = body.name ? body.name : institution.name;
    institution.email = body.email ? body.email : institution.email;
    institution.description = body.description ? body.description : institution.description;
    institution.countries = countries.length > 0 ? countries : institution.countries;
    institution.images = body.images ? body.images : institution.images;
    institution.social_medias = social_medias.length > 0 ? social_medias : institution.social_medias;

    console.log(institution.id, institution.name, institution.email, institution.description, institution.countries, institution.images, institution.social_medias);

    if (process.env.STAGE !== 'test') {
      if (body.images && body.images.length > 0) {
        await this.bucket.delete_folder(`institution/${institution.id}/`).then(() => {
          institution.images.map(async (image: string, index: number) => {
            const content_type = image.split(';')[0].split(':')[1];
            const image_key = `institution/${institution.id}/${index}.${content_type.split('/')[1]}`;
            const image_buffer = Buffer.from(image.split(',')[1], 'base64');
            institution.images[index] = await this.bucket.upload_image(image_key, image_buffer, content_type);
          });
        });
      }
    }

    await this.institution_repo.update_institution(institution);
  }

}