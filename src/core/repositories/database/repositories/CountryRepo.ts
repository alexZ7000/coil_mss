import { CountryDTO } from "../dtos/CountryDTO";
import { Country as CountryDB } from "../models/Models";
import { ICountryRepo } from "../../interfaces/ICountryRepo";
import { Country } from "../../../structure/entities/Country";

export class CountryRepo implements ICountryRepo {
    private countryDTO: CountryDTO;

    constructor() {
        this.countryDTO = new CountryDTO();
    }

    public async get_all_countries(): Promise<Country[]> {
        const countriesDB = await CountryDB.findAll();
        return countriesDB.map(country => this.countryDTO.to_entity(country.toJSON()));
    }
}