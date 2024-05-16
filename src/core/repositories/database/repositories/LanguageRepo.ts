import { LanguageDTO } from "../dtos/LanguageDTO";
import { Language as LanguageDB } from "../models/Models";
import { ILanguageRepo } from "../../interfaces/ILanguageRepo";
import { Language } from "../../../structure/entities/Language";


export class LanguageRepo implements ILanguageRepo {
    private languageDTO: LanguageDTO;

    constructor() {
        this.languageDTO = new LanguageDTO();
    }

    public async get_all_languages(): Promise<Language[]> {
        const languagesDB = await LanguageDB.findAll();
        return languagesDB.map(language => this.languageDTO.to_entity(language.toJSON()));
    }
}
