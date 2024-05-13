import { Language } from "../entities/Language";

export class LanguageMock {
    public languages: Language[];

    constructor() {
        this.languages = [
            new Language({
                id: 1,
                language: "Portuguese",
                language_code: "pt"
            }),
            new Language({
                id: 2,
                language: "English",
                language_code: "en"
            }),
            new Language({
                id: 3,
                language: "Spanish",
                language_code: "es"
            }),
            new Language({
                id: 4,
                language: "French",
                language_code: "fr"
            }),
            new Language({
                id: 5,
                language: "German",
                language_code: "de"
            }),
            new Language({
                id: 6,
                language: "Italian",
                language_code: "it"
            }),
            new Language({
                id: 7,
                language: "Mandarin",
                language_code: "zh"
            }),
            new Language({
                id: 8,
                language: "Japanese",
                language_code: "ja"
            }),
            new Language({
                id: 9,
                language: "Korean",
                language_code: "ko"
            }),
            new Language({
                id: 10,
                language: "Arabic",
                language_code: "ar"
            }),
            new Language({
                id: 11,
                language: "Russian",
                language_code: "ru"
            }),
            new Language({
                id: 12,
                language: "Dutch",
                language_code: "nl"
            }),
            new Language({
                id: 13,
                language: "Swedish",
                language_code: "sv"
            }),
            new Language({
                id: 14,
                language: "Danish",
                language_code: "da"
            }),
            new Language({
                id: 15,
                language: "Norwegian",
                language_code: "no"
            }),
            new Language({
                id: 16,
                language: "Finnish",
                language_code: "fi"
            }),
            new Language({
                id: 17,
                language: "Polish",
                language_code: "pl"
            }),
        ];
    }
}
