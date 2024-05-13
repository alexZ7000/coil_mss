import { it, describe, expect } from 'vitest'

import { Course } from '../../../../src/core/structure/entities/Course'


describe("Testing Course entity", () => {
    it("should throw an error if the name is less than 3 characters", async () => {
        await expect(async () => {
            new Course({
                id: 1,
                course: "CS"
            })
        }).rejects.toThrow("Parameter name must be between 3 and 255 characters");
    });

    it("should not throw an error if the name is 3 characters or more", async () => {
        await expect(async () => {
            new Course({
                id: 1,
                course: "CSE"
            })
        }).not.toThrow();
    });

    it("should set the name property", async () => {
        const course = new Course({
            id: 1,
            course: "CSE"
        });

        expect(course.course).toBe("CSE");
    });

    it("should set the id property", async () => {
        const course = new Course({
            id: 1,
            course: "CSE"
        });

        expect(course.id).toBe(1);
    });
}); 