import { randomUUID } from 'crypto';
import { it, describe, expect } from 'vitest';

import { User } from '../../../../src/core/structure/entities/User';
import { UserTypeEnum } from '../../../../src/core/helpers/enums/UserTypeEnum';

describe("Testing User Entity", () => {
    it("should create a user", async () => {
        var id = randomUUID();
        var user = new User({
            id: id,
            name: "Felipe Carillo",
            email: "23.00765-6@maua.br",
            user_type: UserTypeEnum.STUDENT,
            course: "Engenharia de Computação",
            semester_course: 1,
            created_at: new Date(),
            updated_at: new Date()
        });

        expect(user.id).toBe(id);
        expect(user.name).toBe("Felipe Carillo");
        expect(user.email).toBe("23.00765-6@maua.br");
        expect(user.user_type).toBe(UserTypeEnum.STUDENT);
        expect(user.course).toBe("Engenharia de Computação");
        expect(user.semester_course).toBe(1);
    });

    // it("should not create a user without id", async () => {
    //     expect(() => {
    //         var user = new User({
    //             id: "",
    //             name: "Felipe Carillo",
    //             email: "23.00765-6@maua.br",
    //             user_type: UserTypeEnum.STUDENT,
    //             course: "Engenharia de Computação",
    //             semester_course: 1,
    //             created_at: new Date(),
    //             updated_at: new Date()
    //         });
    //     }
    //     ).toThrowError("Invalid id");
    // }
    // );
    }
); 

