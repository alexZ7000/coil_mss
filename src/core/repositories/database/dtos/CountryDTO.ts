import { Country } from "../../../structure/entities/Country";

export class CountryProps {
    id: number;
    country: string;
    country_code: string;
}

export class CountryDTO {

    public to_entity(country: CountryProps): Country {
        return new Country({
            id: country.id,
            country: country.country,
            country_code: country.country_code
        });
    }
}