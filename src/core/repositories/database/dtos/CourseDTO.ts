import { Course } from "../../../structure/entities/Course";


class Props {
    id: number;
    name: string;
}
    

export class CourseDTO {
    public to_entity(course: Props): Course {
        return new Course({
            id: course.id,
            name: course.name,
        });
    }

    public to_database(course: Course): Props {
        return {
            id: course.id,
            name: course.name,
        };
    }
}