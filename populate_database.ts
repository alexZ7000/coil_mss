import dotenv from 'dotenv';
import { randomUUID } from 'crypto';
import { UserTypeEnum } from './src/core/helpers/enums/UserTypeEnum';
import { User, Course, UserType, ActivityCourse, Institution, InstitutionImage, InstitutionSocialMedia } from './src/core/repositories/database/models/Models';

dotenv.config();

const instances = [UserType, Course, User, ActivityCourse, Institution, InstitutionImage, InstitutionSocialMedia];
const stage = process.env.STAGE || "test";

const handleDatabaseCreation = async () => {
    for (const instance of instances) {
        await instance.sync({ alter: true });
    }
}

async function createOrUpdateUser(name: string, email: string, user_type: number, course_id: number | null, semester: number | null) {
    let user = await User.findOne({ where: { email } });
    if (user) {
        await user.update({ user_type_id: user_type, course_id, semester });
    } else {
        await User.create({
            id: randomUUID(),
            name,
            email,
            user_type_id: user_type,
            course_id,
            semester,
            created_at: new Date(),
            updated_at: new Date()
        });
    }
    console.log(`User ${name} ${user ? 'updated' : 'created'}`);
}

const handleUserTypeCreation = async (i: number) => {
    let userType = await UserType.findByPk(i);
    if (!userType) {
        await UserType.create({ id: i, name: UserTypeEnum[i] });
    }
    console.log(`UserType ${UserTypeEnum[i]} ${userType ? 'updated' : 'created'}`);
}

const courses = ["Ciência da Computação", "Sistema da Inforamação", "Ciência de dados e Inteligencia Artificial", "Engenharia de Computação",
    "Engenharia de Produção", "Engenharia de Controle e Automação", "Engenharia Elétrica", "Engenharia Mecânica", "Engenharia Química",
    "Engenharia de Alimentos", "Engenharia Civil"];

handleDatabaseCreation().then(async () => {
    console.log("Database created");
    for (const course of courses) {
        let existingCourse = await Course.findOne({ where: { name: course } });
        if (!existingCourse) {
            await Course.create({ name: course });
            console.log(`Course ${course} created`);
        }
    }
    console.log("Courses checked/created");
}).then(async () => {
    for (let i = 1; i <= 3; i++) {
        await handleUserTypeCreation(i);
    }
    console.log("UserTypes checked/created");
}).then(async () => {
    await createOrUpdateUser("Relações Internacionais", "relacoes-internacionais@maua.br", UserTypeEnum.ADMIN, 1, null);
    if (["dev", "test"].includes(process.env.STAGE || "")) {
        await createOrUpdateUser("Felipe Carillo", "23.00765-6@maua.br", UserTypeEnum.ADMIN, 1, 1);
    }
    console.log("Users checked/created");
}).catch((err) => {
    console.log(err);
});
