import { Institution } from "../../structure/entities/Institution";

export interface IInstitutionRepo {
    check_institution_exists_by_name(name: string): Promise<boolean>;

    create_institution(institution: Institution): Promise<boolean>;
    update_institution(institution: Institution): Promise<boolean>;

    get_all_institutions(): Promise<Institution[]>;
    get_all_institutions_names(): Promise<{ id: string, name: string }[]>;
    get_institution(id: string): Promise<Institution | null>;

    delete_institution(id: string): Promise<boolean>;
}