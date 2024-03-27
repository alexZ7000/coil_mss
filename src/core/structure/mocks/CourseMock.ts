import { Course } from '../entities/Course';


export class CourseMock {
    public courses: Course[];
    

    constructor() {
        this.courses = [
            new Course(
                {
                    id: 1,
                    name: "Computer Science"
                },
            ),
            new Course(
                {
                    id: 2,
                    name: "Information Technology"
                }
            ),
            new Course(
                {
                    id: 3,
                    name: "Software Engineering"
                }
            ),
            new Course(
                {
                    id: 4,
                    name: "Computer Engineering"
                }
            ),
            new Course(
                {
                    id: 5,
                    name: "Electrical Engineering"
                }
            ),
            new Course(
                {
                    id: 6,
                    name: "Mechanical Engineering"
                }
            ),
            new Course(
                {
                    id: 7,
                    name: "Civil Engineering"
                }
            )
        ];
    }
}