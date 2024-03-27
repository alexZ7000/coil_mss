import { Course } from "../../structure/entities/Course";


export interface ICourseRepo {
    get_courses(): Promise<Course[]>;
    create_course(course: Course): Promise<boolean>;
    update_course(course: Course): Promise<Course>;
    delete_course(id: number): Promise<boolean>;
}