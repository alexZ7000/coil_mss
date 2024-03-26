import { Institution } from "../../structure/entities/Institution";


export interface IInstitutionRepo {
    create_institution(institution: Institution): Promise<boolean>;
    update_institution(institutionId: string, institution: Institution): Promise<Institution>;
    get_institution(id: string): Promise<Institution | null>;
    get_institution_by_email(email: string): Promise<Institution | null>;
    get_all_institutions(): Promise<Institution[]>;
}