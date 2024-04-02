import { User } from '../../structure/entities/User';
import { IActivityRepo } from '../interfaces/IActivityRepo';
import { Activity } from '../../structure/entities/Activity';
import { ActivityMock } from '../../structure/mocks/ActivityMock';
import { ActivityStatusEnum } from "../../helpers/enums/ActivityStatusEnum";


export class ActivityRepoMock implements IActivityRepo {
    private project_mock: ActivityMock;

    constructor() {
        this.project_mock = new ActivityMock();
    }

    async get_activity(id: string): Promise<Activity | null> {
        return this.project_mock.activities.find(activity => activity.id === id) || null;
    }

    async create_activity(activity: Activity): Promise<boolean> {
        this.project_mock.activities.push(activity);
        return true;
    }

    async get_activity_by_title(title: string): Promise<Activity | null> {
        return this.project_mock.activities.find(activity => activity.title === title) || null;
    }

    async get_all_activities_by_status(status: ActivityStatusEnum | ActivityStatusEnum[]): Promise<Activity[]> {
        let statuses = Array.isArray(status) ? status : [status];
        return this.project_mock.activities.filter(activity => statuses.includes(activity.status_activity));        
    }

    async get_all_activities(): Promise<Activity[]> {
        return this.project_mock.activities;
    }

    async update_activity(activity: Activity): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let index = this.project_mock.activities.findIndex(activity => activity.id === activity.id);
            if (index !== -1) {
                this.project_mock.activities[index] = activity;
                resolve(true);
            } else {
                reject(false);
            }
        });
    }

    async delete_activity(id: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let index = this.project_mock.activities.findIndex(activity => activity.id === id);
            if (index !== -1) {
                this.project_mock.activities.splice(index, 1);
                resolve(true);
            } else {
                reject(false);
            }
        });
    }

}

