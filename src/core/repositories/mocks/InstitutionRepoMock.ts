import { IInstitutionRepo } from '../interfaces/IInstitutionRepo';
import { Institution } from '../../structure/entities/Institution';
import { InstitutionMock } from '../../structure/mocks/InstitutionMock'

export class InstitutionRepoMock implements IInstitutionRepo {
    private institutions_mock: InstitutionMock;

    constructor() {
        this.institutions_mock = new InstitutionMock();
    }

    async check_institution_exists_by_name(name: string): Promise<boolean> {
        const institution = this.institutions_mock.institutions.find(institution => institution.name === name);
        return !!institution;
    }

    async create_institution(institution: Institution): Promise<boolean> {
        this.institutions_mock.institutions.push(institution);
        return true;
    }

    async update_institution(institution: Institution): Promise<boolean> {
        const index = this.institutions_mock.institutions.findIndex(institution => institution.id === institution.id);
        if (index !== -1) {
            this.institutions_mock.institutions[index] = institution;
            return true;
        }
        return false;
    }

    async delete_institution(id: string): Promise<boolean> {
        const index = this.institutions_mock.institutions.findIndex(institution => institution.id === id);
        if (index !== -1) {
            this.institutions_mock.institutions.splice(index, 1);
            return true;
        }
        return false;
    }

    async get_institution(id: string): Promise<Institution | null> {
        return this.institutions_mock.institutions.find(institution => institution.id === id) || null;
    }

    async get_institution_by_email(email: string): Promise<Institution | null> {
        return this.institutions_mock.institutions.find(institution => institution.email === email) || null;
    }

    async get_all_institutions(): Promise<Institution[]> {
        return this.institutions_mock.institutions
    }

    async get_all_institutions_names(): Promise<{ id: string; name: string; }[]> {
        return this.institutions_mock.institutions.map(institution => {
            return {
                id: institution.id,
                name: institution.name
            };
        });
    }
}