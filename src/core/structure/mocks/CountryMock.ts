import { Country } from "../entities/Country";

export class CountryMock {
    countries: Country[];

    constructor() {
        this.countries = [
            new Country({ id: 1, country: "Brazil", country_code: "br" }),
            new Country({ id: 2, country: "United States", country_code: "us" }),
            new Country({ id: 3, country: "Canada", country_code: "ca" }),
            new Country({ id: 4, country: "Australia", country_code: "au" }),
            new Country({ id: 5, country: "United Kingdom", country_code: "gb" }),
            new Country({ id: 6, country: "Germany", country_code: "de" }),
            new Country({ id: 7, country: "France", country_code: "fr" }),
            new Country({ id: 8, country: "Italy", country_code: "it" }),
            new Country({ id: 9, country: "Japan", country_code: "jp" }),
            new Country({ id: 10, country: "China", country_code: "cn" }),
            new Country({ id: 11, country: "India", country_code: "in" }),
            new Country({ id: 12, country: "Russia", country_code: "ru" }),
            new Country({ id: 13, country: "Mexico", country_code: "mx" }),
            new Country({ id: 14, country: "Argentina", country_code: "ar" }),
            new Country({ id: 15, country: "South Africa", country_code: "za" }),
            new Country({ id: 16, country: "South Korea", country_code: "kr" }),
            new Country({ id: 17, country: "Spain", country_code: "es" }),
            new Country({ id: 18, country: "Netherlands", country_code: "nl" }),
            new Country({ id: 19, country: "Sweden", country_code: "se" }),
            new Country({ id: 20, country: "Switzerland", country_code: "ch" }),
            new Country({ id: 21, country: "Norway", country_code: "no" }),
            new Country({ id: 22, country: "Denmark", country_code: "dk" }),
            new Country({ id: 23, country: "Finland", country_code: "fi" }),
            new Country({ id: 24, country: "Belgium", country_code: "be" }),
            new Country({ id: 25, country: "Austria", country_code: "at" }),
            new Country({ id: 26, country: "Greece", country_code: "gr" }),
            new Country({ id: 27, country: "Portugal", country_code: "pt" }),
            new Country({ id: 28, country: "Poland", country_code: "pl" }),
            new Country({ id: 29, country: "Turkey", country_code: "tr" }),
            new Country({ id: 30, country: "New Zealand", country_code: "nz" }),
            new Country({ id: 31, country: "Ireland", country_code: "ie" }),
            new Country({ id: 32, country: "Egypt", country_code: "eg" }),
            new Country({ id: 33, country: "Saudi Arabia", country_code: "sa" }),
            new Country({ id: 34, country: "United Arab Emirates", country_code: "ae" }),
            new Country({ id: 35, country: "Chile", country_code: "cl" }),
            new Country({ id: 36, country: "Colombia", country_code: "co" }),
            new Country({ id: 37, country: "Peru", country_code: "pe" }),
        ];
    }
}
