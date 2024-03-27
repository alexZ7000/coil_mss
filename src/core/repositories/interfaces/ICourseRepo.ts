import { Course } from "../../structure/entities/Course";


export interface ICourseRepo {
    get_course(id: number): Course;
    get_courses(): Course[];
    create_course(course: Course): boolean;
    update_course(course: Course): Course;
    delete_course(id: number): boolean;
}