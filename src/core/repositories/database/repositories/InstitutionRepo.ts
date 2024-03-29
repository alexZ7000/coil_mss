import { IInstitutionRepo } from "../../interfaces/IInstitutionRepo";
import { Institution } from "../../../structure/entities/Institution";

export class InstitutionRepo implements IInstitutionRepo {

    public async get_all_institutions(): Promise<Institution[]> {
        throw new Error("Method not implemented.");
    }

    public async create_institution(institution: Institution): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    public async update_institution(institution: Institution): Promise<Institution> {
        throw new Error("Method not implemented.");
    }

    public async delete_institution(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    public async get_institution(id: string): Promise<Institution | null> {
        throw new Error("Method not implemented.");
    }
}
