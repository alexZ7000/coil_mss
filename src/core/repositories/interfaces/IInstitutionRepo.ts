import { Institution } from "../../structure/entities/Institution";


export interface IInstitutionRepo {
    check_institution_exists_by_name(name: string): Promise<boolean>;
    create_institution(institution: Institution): Promise<boolean>;
    update_institution(institution: Institution): Promise<boolean>;
    get_institution(id: string): Promise<Institution | null>;
    get_all_institutions(): Promise<Institution[]>;
    delete_institution(id: string): Promise<boolean>;
}