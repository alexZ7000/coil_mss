import { Institution } from "../entities/Institution";
import { EntityError } from "../../helpers/errors/EntityError";

export class InstitutionMock {
    public institutions: Institution[];

    constructor() {
        this.institutions = [
            new Institution({
                id: "1c92b625-eb2a-4e56-8d9b-99e3c4a93b58",
                name: "Example University",
                email: "example@example.com",
                country: "CountryName",
                social_medias: {
                    media: "Twitter",
                    link: "https://twitter.com/example"
                },
                images: "asldkf;"
            }),
            new Institution({
                id: "2b968d1e-df34-49db-86d7-4c69a75e07c4",
                name: "Another University",
                email: "another@example.com",
                country: "AnotherCountry",
                social_medias: {
                    media: "Facebook",
                    link: "https://facebook.com/another"
                }
            })
        ];
    }

    public get_institution(id: string): Promise<Institution | null> {
        return new Promise((resolve, reject) => {
            const institution = this.institutions.find(inst => inst.id === id);
            resolve(institution || null);
        });
    }

    public create_institution(institution: Institution): Promise<boolean> {
        this.institutions.push(institution);
        return Promise.resolve(true);
    }

    public update_institution(institution: Institution): Promise<Institution> {
        const index = this.institutions.findIndex(inst => inst.id === institution.id);
        if (index !== -1) {
            this.institutions[index] = institution;
            return Promise.resolve(institution);
        }
        return Promise.reject(new EntityError("Institution not found"));
    }

    public delete_institution(id: string): Promise<boolean> {
        const index = this.institutions.findIndex(inst => inst.id === id);
        if (index !== -1) {
            this.institutions.splice(index, 1);
            return Promise.resolve(true);
        }
        return Promise.reject(new EntityError("Institution not found"));
    }

    public get_all_institutions(): Promise<Institution[]> {
        return Promise.resolve(this.institutions);
    }

    public get_institution_by_email(email: string): Promise<Institution | null> {
        return new Promise((resolve, reject) => {
            const institution = this.institutions.find(inst => inst.email === email);
            resolve(institution || null);
        });
    }
}