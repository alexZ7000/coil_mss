import { EntityError } from "../../helpers/errors/EntityError";

class LanguageProps{
    id: number;
    language: string;
    language_code: string;
}

export class Language{
    id: number;
    language: string;
    language_code: string;

    constructor(props: LanguageProps) {
        this.id = this.validate_set_id(props.id);
        this.language = this.validate_set_language(props.language);
        this.language_code = props.language_code;
    }

    public to_json() {
        return {
            id: this.id,
            language: this.language,
            language_code: this.language_code
        }
    }

    private validate_set_id(id: number) {
        if (id == null || id == undefined) {
            throw new EntityError("Parameter id is required");
        }
        if (typeof id !== "number") {
            throw new EntityError("Parameter id is not a number");
        }
        return id;
    }

    private validate_set_language(language: string) {
        if (language == null || language == undefined) {
            throw new EntityError("Parameter language is required");
        }
        if (typeof language !== "string") {
            throw new EntityError("Parameter language is not a string");
        }
        return language;
    }
}