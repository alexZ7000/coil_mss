import { Activity } from "../../structure/entities/Activity";
import { ActivityStatusEnum } from "../../helpers/enums/ActivityStatusEnum";

export interface IActivityRepo {
    get_activity(id: string): Promise<Activity | null>
    create_activity(activity: Activity): Promise<boolean> 
    get_activity_by_title(title: string): Promise<Activity | null> 
    get_all_activities_by_status(status: ActivityStatusEnum | ActivityStatusEnum[]): Promise<Activity[]> 
    get_all_activities(): Promise<Activity[]> 
}