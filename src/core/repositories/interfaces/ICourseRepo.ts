import { Course } from "../../structure/entities/Course";


export interface ICourseRepo {
    get_course(id: number): Promise<Course | null>;
    get_all_courses(): Promise<Course[]>;
    create_course(course: Course): Promise<boolean>;
    update_course(course: Course): Promise<boolean>;
    delete_course(id: number): Promise<boolean>;
}