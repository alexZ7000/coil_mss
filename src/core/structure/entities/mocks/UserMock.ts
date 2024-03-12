import { User } from "../User";
import { UserTypeEnum } from "../../../helpers/enums/UserTypeEnum";


export class UserMock {
    public users: User[];
    public user: User;

    constructor() {
        this.users = [
            new User(
                "04e95456-d5d9-4bb7-ab30-374393fbba74",
                "Felipe Carillo",
                "23.00765-6@maua.br",
                UserTypeEnum.STUDENT,
                "Ciência de Computação",
                2
            )
        ];
        this.user = new User ()
    }
}