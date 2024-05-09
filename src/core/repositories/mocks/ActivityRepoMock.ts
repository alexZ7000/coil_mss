import { User } from '../../structure/entities/User';
import { UserMock } from '../../structure/mocks/UserMock';
import { IActivityRepo } from '../interfaces/IActivityRepo';
import { Activity } from '../../structure/entities/Activity';
import { ActivityMock } from '../../structure/mocks/ActivityMock';
import { ActivityStatusEnum } from "../../helpers/enums/ActivityStatusEnum";


export class ActivityRepoMock implements IActivityRepo {
    private activity_mock: ActivityMock;
    private user_mock: UserMock;

    constructor() {
        this.user_mock = new UserMock();
        this.activity_mock = new ActivityMock();
    }

    async get_activities_by_user_id(user_id: string, type: ActivityStatusEnum): Promise<Activity[] | null> {
        throw new Error("Method not implemented.");
    }

    async get_activity_applicant(activity_id: string, user_id: string): Promise<{ user_id: string; status: boolean; } | null> {
        const activity = this.activity_mock.activities.find(activity => activity.id === activity_id);
        if (activity) {
            const applicant = activity.applicants.find(applicant => applicant.id === user_id);
            if (applicant) {
                return { user_id: user_id, status: applicant.status };
            }
        }
        return null;
    }

    async check_activity_by_title(title: string): Promise<boolean> {
        return this.activity_mock.activities.some(activity => activity.title === title);
    }

    async check_activity_by_id(id: string): Promise<boolean> {
        return this.activity_mock.activities.some(activity => activity.id === id);
    }

    async assign_user_to_activity(activity_id: string, user_id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async remove_user_from_activity(activity_id: string, user_id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async update_user_activity_status(activity_id: string, user_id: string, status: boolean): Promise<boolean> {
        const activity = this.activity_mock.activities.find(activity => activity.id === activity_id);
        if (activity) {
            const applicant = activity.applicants.find(applicant => applicant.id === user_id);
            if (applicant) {
                applicant.status = status;
                return true;
            }
        }
        return false;
    }

    async get_users_assigned_to_activity(activity_id: string): Promise<User[]> {
        throw new Error("Method not implemented.");
    }

    async get_activity(id: string, applicants?: boolean): Promise<Activity | null> {
        return this.activity_mock.activities.find(activity => activity.id === id) || null;
    }

    async create_activity(activity: Activity): Promise<boolean> {
        this.activity_mock.activities.push(activity);
        return true;
    }

    async get_activity_by_title(title: string): Promise<Activity | null> {
        return this.activity_mock.activities.find(activity => activity.title === title) || null;
    }

    async get_all_activities_by_status(status: ActivityStatusEnum | ActivityStatusEnum[]): Promise<Activity[]> {
        let statuses = Array.isArray(status) ? status : [status];
        return this.activity_mock.activities.filter(activity => statuses.includes(activity.status_activity));
    }

    async get_all_activities(): Promise<Activity[]> {
        return this.activity_mock.activities;
    }

    async update_activity_status(activity_id: string, status: ActivityStatusEnum): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let index = this.activity_mock.activities.findIndex(activity => activity.id === activity_id);
            if (index !== -1) {
                this.activity_mock.activities[index].status_activity = status;
                resolve(true);
            } else {
                reject(false);
            }
        });
    }

    async update_activity(activity: Activity): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let index = this.activity_mock.activities.findIndex(activity => activity.id === activity.id);
            if (index !== -1) {
                this.activity_mock.activities[index] = activity;
                resolve(true);
            } else {
                reject(false);
            }
        });
    }

    async delete_activity(id: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let index = this.activity_mock.activities.findIndex(activity => activity.id === id);
            if (index !== -1) {
                this.activity_mock.activities.splice(index, 1);
                resolve(true);
            } else {
                reject(false);
            }
        });
    }

}

