import { DatabaseMain } from '../DatabaseMain';
import { IActivityRepo } from '../../interfaces/IActivityRepo';
import { Activity } from '../../../structure/entities/Activity';
import { NotFoundError } from '../../../helpers/errors/RepoError';

import { ActivityStatusEnum } from '../../../helpers/enums/ActivityStatusEnum';


export class ActivityRepo implements IActivityRepo {
    private database: DatabaseMain;

    constructor(database: DatabaseMain) {
        this.database = database;
    }

    public async get_activity(id: string): Promise<Activity> {
        throw new NotFoundError("Project not found");
    }

    public async create_activity(activity: Activity): Promise<boolean> {
        return true;   
    }

    public async get_all_activities(): Promise<Activity[]> {
        return [];
    }

    public async get_all_activities_by_status(status: ActivityStatusEnum | ActivityStatusEnum[]): Promise<Activity[]> {
        return [];
    }

    public async get_activity_by_title(title: string): Promise<Activity | null> {
        return null;
    }
}


    
    
