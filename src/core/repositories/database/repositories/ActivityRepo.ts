import { DatabaseMain } from "../DatabaseMain";
import { ActivityDTO } from "../dtos/ActivityDTO";
import { User } from "../../../structure/entities/User";
import { IActivityRepo } from "../../interfaces/IActivityRepo";
import { Activity } from "../../../structure/entities/Activity";
import { ActivityStatusEnum } from "../../../helpers/enums/ActivityStatusEnum";


export class ActivityRepo implements IActivityRepo {
    private dynamo = new DatabaseMain();
    private activity_dto = new ActivityDTO();

    async get_activity(id: string): Promise<Activity | null> {
        throw new Error("Method not implemented.");
    }

    async create_activity(activity: Activity): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async get_activity_by_title(title: string): Promise<Activity | null> {
        throw new Error("Method not implemented.");
    }

    async get_all_activities_by_status(status: ActivityStatusEnum | ActivityStatusEnum[]): Promise<Activity[]> {
        throw new Error("Method not implemented.");
    }

    async get_all_activities(): Promise<Activity[]> {
        throw new Error("Method not implemented.");
    }

    async get_users_assigned_to_activity(activity_id: string): Promise<User[]> {
        throw new Error("Method not implemented.");
    }

    async assign_user_to_activity(activity_id: string, user_id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async remove_user_from_activity(activity_id: string, user_id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async update_activity(activity: Activity): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async get_activities_by_user_id(user_id: string, type: ActivityStatusEnum): Promise<Activity[] | null> {
        throw new Error("Method not implemented.");    
    }

    async update_user_activity_status(activity_id: string, user_id: string, status: ActivityStatusEnum): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}

