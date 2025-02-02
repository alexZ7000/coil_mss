import { User } from '../../structure/entities/User';
import { IActivityRepo } from '../interfaces/IActivityRepo';
import { Activity } from '../../structure/entities/Activity';
import { ActivityMock } from '../../structure/mocks/ActivityMock';
import { ActivityTypeEnum } from '../../helpers/enums/ActivityTypeEnum';
import { ActivityStatusEnum } from "../../helpers/enums/ActivityStatusEnum";


export class ActivityRepoMock implements IActivityRepo {
    private activity_mock: ActivityMock;

    constructor() {
        this.activity_mock = new ActivityMock();
    }

    async get_activity_applicants(activity_id: string, applicants: string[]): Promise<{ user_id: string; status: boolean; }[]> {
        const activity = this.activity_mock.activities.find(activity => activity.id === activity_id);
        if (activity) {
            const applicants_list = activity.applicants.filter(applicant => applicants.includes(applicant.id));
            return applicants_list.map(applicant => ({ user_id: applicant.id, status: applicant.status }));
        }
        return [];
    }

    async get_activity(id: string, applicants?: boolean): Promise<Activity | null> {
        const activity = this.activity_mock.activities.find(activity => activity.id === id);
        if (activity && applicants) {
            return activity;
        }
        if (activity) {
            const copy_activity = new Activity({
                id: activity.id,
                title: activity.title,
                description: activity.description,
                type_activity: activity.type_activity,
                status_activity: activity.status_activity,
                applicants: [],
                start_date: activity.start_date,
                end_date: activity.end_date,
                created_at: activity.created_at,
                updated_at: activity.updated_at,
                courses: activity.courses,
                languages: activity.languages,
                criterias: activity.criterias,
                partner_institutions: activity.partner_institutions
            });
            return copy_activity;
        }
        return null;
    }

    async get_activities_by_user_id(user_id: string, type: ActivityTypeEnum): Promise<Activity[] | null> {
        return this.activity_mock.activities.filter(activity => activity.applicants.some(applicant => applicant.id === user_id && activity.type_activity === type));
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

    async check_activity_enrolled_by_user(user_id: string, activity_id: string): Promise<boolean> {
        return this.activity_mock.activities.some(activity => activity.id === activity_id && activity.applicants.some(applicant => applicant.id === user_id));
    }

    async check_activity_by_title(title: string): Promise<boolean> {
        return this.activity_mock.activities.some(activity => activity.title === title);
    }

    async check_activity_by_id(id: string): Promise<boolean> {
        return this.activity_mock.activities.some(activity => activity.id === id);
    }

    async assign_user_to_activity(activity_id: string, user_id: string): Promise<{ assign: boolean }> {
        const applicated = this.activity_mock.activities.find(activity => activity.id === activity_id)?.applicants.find(applicant => applicant.id === user_id);
        if (applicated) {
            let index = this.activity_mock.activities.findIndex(activity => activity.id === activity_id);
            if (index !== -1) {
                this.activity_mock.activities[index].applicants = this.activity_mock.activities[index].applicants.filter(applicant => applicant.id !== user_id);
            }
            return { assign: false };
        }
        this.activity_mock.activities.find(activity => activity.id === activity_id)?.applicants.push({ id: user_id, status: false });
        return { assign: true };
    }

    async remove_user_from_activity(activity_id: string, user_id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    update_users_activity_status(activity_id: string, users: { user_id: string, status: boolean }[]): Promise<boolean> {
        const activity = this.activity_mock.activities.find(activity => activity.id === activity_id);
        if (activity) {
            users.forEach(user => {
                let index = activity.applicants.findIndex(applicant => applicant.id === user.user_id);
                if (index !== -1) {
                    activity.applicants[index].status = user.status;
                }
            });
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }

    async get_users_assigned_to_activity(activity_id: string): Promise<User[]> {
        throw new Error("Method not implemented.");
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

    async get_all_activities_catalog(): Promise<{ title: string; logo: string; type_activity: ActivityTypeEnum; }[]> {
        return this.activity_mock.activities.map(activity => ({
            title: activity.title,
            logo: activity.partner_institutions[0].institution?.images[0] || "",
            type_activity: activity.type_activity
        }));
    }

}
