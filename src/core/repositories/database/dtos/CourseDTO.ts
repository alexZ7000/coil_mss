import { Course } from "../../../structure/entities/Course";


export class CourseProps {
    id: number;
    course: string;
}
    

export class CourseDTO {
    public to_entity(course: CourseProps): Course {
        return new Course({
            id: course.id,
            course: course.course
        });
    }
}