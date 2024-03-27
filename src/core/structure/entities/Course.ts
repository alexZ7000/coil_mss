class CourseProps {
    id: number;
    name: string;
}

export class Course {
    id: number;
    name: string;

    constructor(props: CourseProps) {
        this.id = props.id;
        this.name = this.validate_set_name(props.name);
    }

    private validate_set_name(name: string): string {
        if (name.length < 3) {
            throw new Error("Course name must have at least 3 characters");
        }
        return name;
    }
}