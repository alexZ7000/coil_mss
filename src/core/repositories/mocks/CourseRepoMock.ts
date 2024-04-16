import { ICourseRepo } from "../interfaces/ICourseRepo";
import { Course } from "../../structure/entities/Course";
import { CourseMock } from "../../structure/mocks/CourseMock";


export class CourseRepoMock implements ICourseRepo {
    private course_mock: CourseMock;

    constructor() {
        this.course_mock = new CourseMock();
    }

    async get_course(id: number): Promise<Course | null> {
        return new Promise((resolve, reject) => {
            let course = this.course_mock.courses.find(course => course.id === id);
            if (course) {
                resolve(course);
            } else {
                reject("Course not found");
            }
        });
    }

    async create_course(course: Course): Promise<boolean> {
        this.course_mock.courses.push(course);
        return true;
    }

    async update_course(course: Course): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let index = this.course_mock.courses.findIndex(course => course.id === course.id);
            if (index !== -1) {
                this.course_mock.courses[index] = course;
                resolve(true);
            } else {
                reject(false);
            }
        });
    }

    async delete_course(id: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let index = this.course_mock.courses.findIndex(course => course.id === id);
            if (index !== -1) {
                this.course_mock.courses.splice(index, 1);
                resolve(true);
            } else {
                reject(false);
            }
        });
    }

    async get_all_courses(): Promise<Course[]> {
        return this.course_mock.courses
    }
}