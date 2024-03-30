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
        let courses_found = await CourseDB.findAll();

        return courses_found.map(course => {
            return this.courseDTO.to_entity(course.toJSON());
        });
    }

    public async create_course(course: Course): Promise<boolean> {
        await CourseDB.create({
            name: course.name,
        });

        return true;
    }

    public async update_course(course: Course): Promise<boolean> {
        await CourseDB.update({
            name: course.name,
        }, {
            where: {
                id: course.id
            }
        });

        return true;
    }

    public async delete_course(id: number): Promise<boolean> {
        await CourseDB.destroy({
            where: {
                id: id
            }
        });

        return true;
    }
}
    

