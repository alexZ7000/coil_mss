    import { EntityError } from "../../helpers/errors/EntityError";

    
    class InstitutionProps{
        id: string;
        name: string;
        description: string | null;
        email: string;
        country: string;
        images: string[] | [];
        social_medias: { media: string, link: string }[] | [];
    }

    export class Institution {
        id: string;
        name: string;
        description: string | null;
        email: string;
        country: string;
        images: string[] | [];
        social_medias: { media: string, link: string }[] | [];

        constructor(props: InstitutionProps){
            this.id = this.validate_set_id(props.id);
            this.name = this.validate_set_name(props.name);
            this.description = this.validate_set_description(props.description);
            this.email = this.validate_set_email(props.email);
            this.country = this.validate_set_country(props.country);
            this.images = this.validate_set_images(props.images);
            this.social_medias = this.validate_set_social_medias(props.social_medias);
        }

        public to_json(){
            return {
                id: this.id,
                name: this.name,
                email: this.email,
                country: this.country,
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

        private validate_set_name(name: string){
            if (name == null || name == ""){
                throw new EntityError("Parameter name is required")
            }
            if (typeof name !== "string"){
                throw new EntityError("Parameter name must be a string")
            }
            return name;
        }

        private validate_set_description(description: string | null){
            if (description == null || description == ""){
                return "";
            }
            if (typeof description !== "string"){
                throw new EntityError("Parameter description must be a string")
            }
            return description;
        }

        private validate_set_email(email: string){
            if (email == null || email == ""){
            throw new EntityError("Parameter email is required")
            }
            if (typeof email !== "string"){
                throw new EntityError("Parameter email must be a string")
            }
            let standard: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!standard.test(email)){
                throw new EntityError("Invalid email format");
            }
            return email;
        }

        
        private validate_set_country(country: string){
            if (country == null || country == ""){
                throw new EntityError("Parameter country is required")
            }
            if (typeof country !== "string"){
                throw new EntityError("Parameter country has to be a string")
            }
            return country;
        }
      
        private validate_set_images(images: string[]) {
            if (!images || !Array.isArray(images)) {
                throw new EntityError("Parameter images must be an array of strings");
            }
            for (const image of images) {
                if (typeof image !== "string") {
                    throw new EntityError("Each image in the images array must be a string");
                }
            }
            return images;
        }

        private validate_set_social_medias(social_medias: {media: string, link: string}[] | []){
            if (social_medias == null || social_medias.length == 0){
                return [];
            }
            if (!Array.isArray(social_medias)){
                throw new EntityError("Parameter social_medias must be an array of objects")
            }
            for (const social_media of social_medias){
                if (typeof social_media.media !== "string" || typeof social_media.link !== "string"){
                    throw new EntityError("Each social media object must have a media and a link")
                }
            }
            return social_medias;
        }
    }