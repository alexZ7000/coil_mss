import { PrismaClient } from 'prisma/prisma-client';

import { User } from "../structure/entities/User";
import { InternalServerError } from "../helpers/http/http_codes";
import { DatabaseInterface } from "./Interfaces/DatabaseInterface";

export class DatabaseRepo implements DatabaseInterface {

    public get_user(id: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }

    public get_user_by_email(email: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }

    public create_user(user: User): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    public update_user(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
}