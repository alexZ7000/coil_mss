import { User } from '../structure/entities/User';
import { DatabaseInterface } from './Interfaces/DatabaseInterface';

export class MockRepo implements DatabaseInterface {
    
    public get_user(id: string): Promise<User | null> {
        return new Promise((resolve, reject) => {
            resolve(new User());
        });
    }

    public create_user(user: User): Promise<User> {
        return new Promise((resolve, reject) => {
            resolve(new User());
        });
    }

    public update_user(user: User): Promise<User> {
        return new Promise((resolve, reject) => {
            resolve(new User());
        });
    }

    public delete_user(id: string): Promise<User> {
        return new Promise((resolve, reject) => {
            resolve(new User());
        });
    }
}