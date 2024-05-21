import { Language } from "../../../structure/entities/Language";

export class LanguageProps {
    id: number;
    language: string;
    language_code: string;
}

export class LanguageDTO {
    public to_entity(language: LanguageProps): Language {
        return new Language({
            id: language.id,
            language: language.language,
            language_code: language.language_code
        });
    }
}