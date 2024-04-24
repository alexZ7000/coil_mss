import dotenv from 'dotenv';
import { randomUUID } from 'crypto';

import {
    User, Course, UserType, ActivityCourse, Institution, InstitutionImage, InstitutionSocialMedia,
    ActivityStatus, ActivityType, Activity, ActivityApplication, ActivityLanguage, ActivityCriteria, ActivityPartnerInstitution,
} from './src/core/repositories/database/models/Models';
import { UserTypeEnum } from './src/core/helpers/enums/UserTypeEnum';
import { ActivityTypeEnum } from './src/core/helpers/enums/ActivityTypeEnum';
import { ActivityStatusEnum } from './src/core/helpers/enums/ActivityStatusEnum';

dotenv.config();

const courses: string[] = [
    "Ciência da Computação", "Sistema da Inforamação", "Ciência de dados e Inteligencia Artificial", "Engenharia de Computação",
    "Engenharia de Produção", "Engenharia de Controle e Automação", "Engenharia Elétrica", "Engenharia Mecânica", "Engenharia Química",
    "Engenharia de Alimentos", "Engenharia Civil"
];

const institutions = [
    {
        id: randomUUID(),
        name: "Fontys University of Applied Sciences",
        county: "Netherlands",
        email: "teste@test.com"
    }
];

const userTypes: UserTypeEnum[] = [
    UserTypeEnum.ADMIN, UserTypeEnum.STUDENT, UserTypeEnum.MODERATOR
];

const activityStatuses: ActivityStatusEnum[] = [
    ActivityStatusEnum.CANCELED, ActivityStatusEnum.ACTIVE, ActivityStatusEnum.ON_HOLD, ActivityStatusEnum.ENDED, ActivityStatusEnum.TO_START
];

const activityTypes: ActivityTypeEnum[] = [
    ActivityTypeEnum.ACADEMIC_MOBILITY, ActivityTypeEnum.PROJECT
];

async function handleDatabaseCreation(): Promise<void> {
    const stage = process.env.STAGE || "";
    const models = [UserType, Course, Institution, User, ActivityStatus, ActivityType, InstitutionImage, InstitutionSocialMedia, Activity, ActivityApplication, ActivityLanguage, ActivityCriteria, ActivityPartnerInstitution, ActivityCourse];
    if ("prod" !== stage) {
        await Promise.all(models.reverse().map(model => model.sync({ force: true })));
    } else {
        await Promise.all(models.map(model => model.sync({ alter: true })));
    }
}

async function createOrUpdateUser(name: string, email: string, userType: UserTypeEnum, courseId: number | null, semester: number | null): Promise<void> {
    let user = await User.findOne({ where: { email } });
    if (user) {
        await user.update({ userTypeId: userType, courseId, semester });
    } else {
        await User.create({
            id: randomUUID(),
            name,
            email,
            user_type_id: userType,
            course_id: courseId,
            semester,
            created_at: new Date(),
            updated_at: new Date()
        });
    }
    console.log(`User ${name} ${user ? 'updated' : 'created'}`);
}

async function createOrUpdateInstitution(institution: any): Promise<void> {
    let existingInstitution = await Institution.findOne({ where: { name: institution.name } });
    if (!existingInstitution) {
        await Institution.create(institution);
        console.log(`Institution ${institution.name} created`);
    }
    console.log(`Institutions checked/created`);
}

async function createOrUpdateEnumItems(model: any, enumItems: number[], enumType: any): Promise<void> {
    for (const enumItem of enumItems) {
        let item = await model.findOne({ where: { id: enumItem } });
        if (!item) {
            await model.create({ id: enumItem, name: enumType[enumItem] });
            console.log(`${model.name} ${enumType[enumItem]} created`);
        }
    }
    console.log(`${model.name} checked/created`);
}

async function handleCoursesCreation(): Promise<void> {
    for (const course of courses) {
        let existingCourse = await Course.findOne({ where: { name: course } });
        if (!existingCourse) {
            await Course.create({ name: course });
            console.log(`Course ${course} created`);
        }
    }
    console.log("Courses checked/created");
}

(async () => {
    try {
        await handleDatabaseCreation();
        console.log("Database created");
        await handleCoursesCreation();
        console.log("Courses checked/created");
        await createOrUpdateEnumItems(UserType, userTypes, UserTypeEnum);
        await createOrUpdateEnumItems(ActivityStatus, activityStatuses, ActivityStatusEnum);
        await createOrUpdateEnumItems(ActivityType, activityTypes, ActivityTypeEnum);
        console.log("Enums checked/created");
        await createOrUpdateUser("Relações Internacionais", "relacoes-internacionais@maua.br", UserTypeEnum.ADMIN, 1, null);
        const stage = process.env.STAGE || "";
        if (["dev", "test"].includes(stage)) {
            await createOrUpdateUser("Felipe Carillo", "23.00765-6@maua.br", UserTypeEnum.ADMIN, 1, 1);
        }
        console.log("Users checked/created");
        await createOrUpdateInstitution(institutions[0]);
        console.log("Institutions checked/created");
    } catch (error) {
        console.error(error);
    }
})();
