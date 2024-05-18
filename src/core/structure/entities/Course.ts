
class CourseProps {
    id: number;
    course: string;
}

export class Course {
    id: number;
    course: string;

    constructor(props: CourseProps) {
        this.id = props.id;
        this.course = this.validate_set_name(props.course);
    }

    public to_json(): CourseProps {
        return {
            id: this.id,
            course: this.course
        };
    }

    private validate_set_name(name: string): string {
        if (name.length < 3 || name.length > 255) {
            throw new Error("Parameter name must be between 3 and 255 characters");
        }
        return name;
    }
}