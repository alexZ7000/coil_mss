import { Country } from "../../structure/entities/Country";


export interface ICountryRepo {
    get_all_countries(): Promise<Country[]>;
}