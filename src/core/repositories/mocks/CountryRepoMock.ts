import { ICountryRepo } from "../interfaces/ICountryRepo";
import { Country } from "../../structure/entities/Country";
import { CountryMock } from "../../structure/mocks/CountryMock";

export class CountryRepoMock implements ICountryRepo {
    private country_mock: CountryMock

    constructor() { 
        this.country_mock = new CountryMock();
    }

    public async get_all_countries(): Promise<Country[]> {
        return this.country_mock.countries;
    }
}