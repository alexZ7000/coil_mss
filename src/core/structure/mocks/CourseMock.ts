import { Course } from '../entities/Course';


export class CourseMock {
    public courses: Course[];


    constructor() {
        this.courses = [
            new Course({
                id: 1,
                course: "Computer Science"
            }),
            new Course({
                id: 2,
                course: "Information Systems"
            }),
            new Course({
                id: 3,
                course: "Data Science and Artificial Intelligence"
            }),
            new Course({
                id: 4,
                course: "Computer Engineering"
            }),
            new Course({
                id: 5,
                course: "Industrial Engineering"
            }),
            new Course({
                id: 6,
                course: "Control and Automation Engineering"
            }),
            new Course({
                id: 7,
                course: "Electrical Engineering"
            }),
            new Course({
                id: 8,
                course: "Mechanical Engineering"
            }),
            new Course({
                id: 9,
                course: "Chemical Engineering"
            }),
            new Course({
                id: 10,
                course: "Food Engineering"
            }),
            new Course({
                id: 11,
                course: "Civil Engineering"
            })
        ];
    }
}