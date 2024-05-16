import { Course } from '../entities/Course';


export class CourseMock {
    public courses: Course[];


    constructor() {
        this.courses = [
            new Course({ id: 1, course: "Administration"}),
            new Course({ id: 2, course: "Architecture and Urbanism"}),
            new Course({ id: 3, course: "Computer Science"}),
            new Course({ id: 4, course: "Design"}),
            new Course({ id: 5, course: "Civil Engineering"}),
            new Course({ id: 6, course: "Food Engineering"}),
            new Course({ id: 7, course: "Computer Engineering"}),
            new Course({ id: 8, course: "Control and Automation Engineering"}),
            new Course({ id: 9, course: "Production Engineering"}),
            new Course({ id: 10, course: "Electrical Engineering"}),
            new Course({ id: 10, course: "Eletrotechnical Engineering"}),
            new Course({ id: 11, course: "Mechanical Engineering"}),
            new Course({ id: 12, course: "Chemical Engineering"}),
            new Course({ id: 13, course: "Artificial Intelligence and Data Science"}),
            new Course({ id: 14, course: "International Relations"}),
            new Course({ id: 15, course: "Information Systems"}),
        ];
    }
}