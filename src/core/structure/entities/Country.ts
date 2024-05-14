import { EntityError } from "../../helpers/errors/EntityError";

class CountryProps {
    id: number;
    country: string | null;
    country_code: string | null;
}

export class Country {
    id: number;
    country: string | null;
    country_code: string | null;

    constructor(props: CountryProps) {
        this.id = this.validate_set_id(props.id);
        this.country = this.validate_set_country(props.country);
        this.country_code = props.country_code;
    }

    public to_json() {
        return {
            id: this.id,
            country: this.country,
            country_code: this.country_code
        }
    }

    private validate_set_id(id: number): number {
        if (id == null || id == undefined) {
            throw new EntityError("Parameter id is required");
        }
        if (typeof id !== "number") {
            throw new EntityError("Parameter id is not a number");
        }
        return id;
    }

    private validate_set_country(country: string | null): string | null {
        if (country == null || country == "") {
            return null;
        }
        if (typeof country !== "string") {
            throw new EntityError("Parameter country is not a string");
        }
        if (country.length < 3 || country.length > 255) {
            throw new EntityError("Parameter country must be between 3 and 255 characters");
        }
        return country;
    }
}