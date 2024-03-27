import { PrismaClient } from "@prisma/client";

import { CourseDTO } from "../dtos/CourseDTO";
import { DatabaseMain } from "../DatabaseMain";
import { ICourseRepo } from "../../interfaces/ICourseRepo";
import { Course } from "../../../structure/entities/Course";

export class CourseRepo implements ICourseRepo {
    private client: PrismaClient;
    private course_dto: CourseDTO = new CourseDTO();
  
    constructor() {
      this.client = new DatabaseMain().rd_client;
    }

    public async get_courses(): Promise<Course[]> {
        let courses_found = await this.client.course.findMany();
        return courses_found.map((course) => this.course_dto.to_entity(course));
    }

    public async create_course(course: Course): Promise<boolean> {
        let course_to_create = this.course_dto.to_database(course);
        
        await this.client.course.create({
            data: course_to_create,
        }).then(() => {
            return true;
        }).catch(() => {
            return false;
        });

        return false;
    }

    public async update_course(course: Course): Promise<Course> {
        let course_to_update = this.course_dto.to_database(course);
        
        await this.client.course.update({
            where: {
                id: course.id,
            },
            data: course_to_update,
        });

        return course;
    }

    public async delete_course(id: number): Promise<boolean> {
        await this.client.course.delete({
            where: {
                id: id,
            },
        });

        return true;
    }
}
    

