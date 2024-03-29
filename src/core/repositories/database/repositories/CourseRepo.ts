import { CourseDTO } from "../dtos/CourseDTO";
import { DatabaseMain } from "../DatabaseMain";
import { ICourseRepo } from "../../interfaces/ICourseRepo";
import { Course } from "../../../structure/entities/Course";

export class CourseRepo implements ICourseRepo {

    public async get_courses(): Promise<Course[]> {
        throw new Error("Method not implemented.");
    }

    public async create_course(course: Course): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    public async update_course(course: Course): Promise<Course> {
        throw new Error("Method not implemented.");
    }

    public async delete_course(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}
    

