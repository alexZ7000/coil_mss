import { Institution } from "../../structure/entities/Institution";


export interface IInstitutionRepo {
    create_institution(institution: Institution): Promise<boolean>;
    update_institution(institution: Institution): Promise<Institution>;
    get_institution(id: string): Promise<Institution | null>;
    get_all_institutions(): Promise<Institution[]>;
    delete_institution(id: string): Promise<boolean>;
}