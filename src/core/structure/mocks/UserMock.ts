import { User } from "../entities/User";
import { UserTypeEnum } from "../../helpers/enums/UserTypeEnum";


export class UserMock {
    public users: User[];

    constructor() {
        this.users = [
            new User({
                id: "365556ad-69d2-43cd-b98c-287bf7606fba",
                name: "Rodrigo Bossini",
                email: "rodrigo.moreira@maua.br",
                user_type: UserTypeEnum.ADMIN,
                course: null,
                semester_course: null,
                created_at: new Date(),
                updated_at: new Date()
            }),
            new User(
                {
                    id: "2c7e1cbb-fff5-4572-998e-283381537512",
                    name: "Felipe Carillo",
                    email: "23.00765-6@maua.br",
                    user_type: UserTypeEnum.STUDENT,
                    course: "Engenharia de Computação",
                    semester_course: 4,
                    created_at: new Date(),
                    updated_at: new Date()
                }
            ),
            new User(
                {
                    id: "6033c5ca-1401-426f-b2b6-d2a08d144633",
                    name: "Felipe Carillo",
                    email: "felipecarillo@outlook.com",
                    user_type: UserTypeEnum.MODERATOR,
                    course: null,
                    semester_course: null,
                    created_at: new Date(),
                    updated_at: new Date()
                }
            )
        ];                
    }

    public get_user(id: string): Promise<User | null>{
        return new Promise((resolve, reject) => {
            const user = this.users.find(user => user.id === id);
            resolve(user || null);
        });
    }

    public create_user(user: User): Promise<boolean> {
        this.users.push(user);
        return Promise.resolve(true);
    }

    public update_user(user: User): Promise<User> {
        this.users.forEach((user) => {
            if (user.id == user.id) {
                user = user;
            }
        });
        return Promise.resolve(user);
    }

    public get_user_by_email(email: string): Promise<User | null> {
        return new Promise((resolve, reject) => {
            const user = this.users.find(user => user.email === email);
            resolve(user || null);
        });
    }
}