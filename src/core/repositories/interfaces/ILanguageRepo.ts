import { Language } from "../../structure/entities/Language";

export interface ILanguageRepo {
    get_all_languages(): Promise<Language[]>;
}