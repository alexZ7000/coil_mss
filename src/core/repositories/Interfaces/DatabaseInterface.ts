import { User } from '../../structure/entities/User';	

export interface DatabaseInterface {
    get_user(id: string): Promise<User | null>;
    create_user(user: User): Promise<User>;
    update_user(user: User): Promise<User>;
    delete_user(id: string): Promise<User>;
}