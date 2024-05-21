import { CourseDTO } from "../dtos/CourseDTO";
import { Course as CourseDB } from "../models/Models";
import { ICourseRepo } from "../../interfaces/ICourseRepo";
import { Course } from "../../../structure/entities/Course";


export class CourseRepo implements ICourseRepo {
    private courseDTO: CourseDTO;

    constructor() {
        this.courseDTO = new CourseDTO();
    }


    public async get_all_courses(): Promise<Course[]> {
        const coursesDB = await CourseDB.findAll();        
        return coursesDB.map(course => this.courseDTO.to_entity(course.toJSON()));
    }
}


