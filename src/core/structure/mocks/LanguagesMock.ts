import { Language } from "../entities/Language";

export class LanguagesMock {
    public languages: Language[];

    constructor() {
        this.languages = [
            new Language({
                id: 1,
                language: "Português",
                language_code: "pt"
            }),
            new Language({
                id: 2,
                language: "Inglês",
                language_code: "en"
            }),
            new Language({
                id: 3,
                language: "Espanhol",
                language_code: "es"
            }),
            new Language({
                id: 4,
                language: "Francês",
                language_code: "fr"
            }),
            new Language({
                id: 5,
                language: "Alemão",
                language_code: "de"
            }),
            new Language({
                id: 6,
                language: "Italiano",
                language_code: "it"
            }),
            new Language({
                id: 7,
                language: "Mandarim",
                language_code: "zh"
            }),
            new Language({
                id: 8,
                language: "Japonês",
                language_code: "ja"
            }),
            new Language({
                id: 9,
                language: "Coreano",
                language_code: "ko"
            }),
            new Language({
                id: 10,
                language: "Árabe",
                language_code: "ar"
            }),
            new Language({
                id: 11,
                language: "Russo",
                language_code: "ru"
            }),
            new Language({
                id: 12,
                language: "Holandês",
                language_code: "nl"
            }),
            new Language({
                id: 13,
                language: "Sueco",
                language_code: "sv"
            }),
            new Language({
                id: 14,
                language: "Dinamarquês",
                language_code: "da"
            }),
            new Language({
                id: 15,
                language: "Norueguês",
                language_code: "no"
            }),
            new Language({
                id: 16,
                language: "Finlandês",
                language_code: "fi"
            }),
            new Language({
                id: 17,
                language: "Polonês",
                language_code: "pl"
            }),
        ];
    }
}
