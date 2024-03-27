import { IInstitutionRepo } from '../interfaces/IInstitutionRepo';
import { Institution } from '../../structure/entities/Institution';
import { InstitutionMock } from '../../structure/mocks/InstitutionMock'

export class InstitutionRepoMock implements IInstitutionRepo {
    private institutions_mock: InstitutionMock;

    constructor() {
        this.institutions_mock = new InstitutionMock();
    }

    async create_institution(institution: Institution): Promise<boolean> {
        this.institutions_mock.institutions.push(institution);
        return true;
    }

    async update_institution(institutionId: string, institution: Institution): Promise<Institution> {
        return new Promise((resolve, reject) => {
            const institution_index = this.institutions_mock.institutions.findIndex(institution => institution.id === institutionId);
            this.institutions_mock.institutions[institution_index] = institution;
            resolve(this.institutions_mock.institutions[institution_index]);
        });
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
}