import { Course } from "../../structure/entities/Course";

export interface ICourseRepo {
    get_all_courses(): Promise<Course[]>;
}