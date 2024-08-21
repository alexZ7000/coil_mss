import { Country } from "./Country";
import { SocialMedia } from "./SocialMedia";
import { EntityError } from "../../helpers/errors/EntityError";


class InstitutionProps {
    id: string;
    name: string;
    description: string | null;
    email: string;
    countries: { id: number, country?: Country }[];
    images: string[] | [];
    social_medias: { id: number, media?: SocialMedia, link: string }[];
}

export class Institution {
    id: string;
    name: string;
    description: string | null;
    email: string;
    countries: { id: number, country?: Country }[];
    images: string[] | [];
    social_medias: { id: number, media?: SocialMedia, link: string }[];

    constructor(props: InstitutionProps) {
        this.id = this.validate_set_id(props.id);
        this.name = this.validate_set_name(props.name);
        this.description = this.validate_set_description(props.description);
        this.email = this.validate_set_email(props.email);
        this.countries = this.validate_set_country(props.countries);
        this.images = this.validate_set_images(props.images);
        this.social_medias = this.validate_set_social_medias(props.social_medias);
    }

    public to_json() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            email: this.email,
            countries: this.countries,
            images: this.images,
            social_medias: this.social_medias
        }
    }

    private validate_set_id(id: string) {
        if (id == null) {
            throw new EntityError("Parameter id is required");
        }
        if (typeof id !== "string") {
            throw new EntityError("Parameter id must be a string");
        }
        if (id.length != 36) {
            throw new EntityError("Parameter id is not a valid UUID");
        }
        return id;
    }

    private validate_set_name(name: string) {
        if (name == null || name == "") {
            throw new EntityError("Parameter name is required")
        }
        if (typeof name !== "string") {
            throw new EntityError("Parameter name must be a string")
        }
        if (name.length < 3 || name.length > 255) {
            throw new EntityError("Parameter name must have between 3 and 255 characters")
        }
        return name;
    }

    private validate_set_description(description: string | null) {
        if (description == null || description == "") {
            return "";
        }
        if (typeof description !== "string") {
            throw new EntityError("Parameter description must be a string")
        }
        if (description.length < 3 || description.length > 65535) {
            throw new EntityError("Parameter description must have between 3 and 255 characters")
        }
        return description;
    }

    private validate_set_email(email: string) {
        if (email == null || email == "") {
            throw new EntityError("Parameter email is required")
        }
        if (typeof email !== "string") {
            throw new EntityError("Parameter email must be a string")
        }
        if (email.length < 3 || email.length > 255) {
            throw new EntityError("Parameter email must have between 3 and 255 characters")
        }
        let standard: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!standard.test(email)) {
            throw new EntityError("Invalid email format");
        }
        return email;
    }


    private validate_set_country(countries: { id: number, country?: Country }[]) {
        if (countries == null || countries.length == 0) {
            throw new EntityError("Parameter countries is required")
        }
        if (!countries || !Array.isArray(countries)) {
            throw new EntityError("Parameter countries must be an array of objects");
        }
        return countries;
    }

    private validate_set_images(images: string[]) {
        if (!images || !Array.isArray(images)) {
            throw new EntityError("Parameter images must be an array of strings");
        }
        if (images.length > 10) {
            throw new EntityError("Parameter images must have a maximum of 10 images");
        }
        for (const image of images) {
            if (typeof image !== "string") {
                throw new EntityError("Each image in the images array must be a string");
            }
        }
        return images;
    }

    private validate_set_social_medias(social_medias: { id: number, media?: SocialMedia, link: string }[]) {
        if (social_medias == null || social_medias.length == 0) {
            return [];
        }
        if (!Array.isArray(social_medias)) {
            throw new EntityError("Parameter social_medias must be an array of objects")
        }
        return social_medias;
    }
}
