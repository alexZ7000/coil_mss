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

    public to_json(): CourseProps {
        return {
            id: this.id,
            name: this.name,
        };
    }

    private validate_set_name(name: string): string {
        if (name.length < 3 || name.length > 255) {
            throw new Error("Parameter name must be between 3 and 255 characters");
        }
        return name;
    }
}