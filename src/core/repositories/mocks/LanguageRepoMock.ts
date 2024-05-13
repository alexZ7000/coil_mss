import { ILanguageRepo } from "../interfaces/ILanguageRepo";
import { Language } from "../../structure/entities/Language";
import { LanguageMock } from "../../structure/mocks/LanguageMock";

export class LanguageRepoMock implements ILanguageRepo {
    private languages_mock: LanguageMock

    constructor() { 
        this.languages_mock = new LanguageMock(); 
    }

    public async get_all_languages(): Promise<Language[]> {
        return this.languages_mock.languages;
    }
}