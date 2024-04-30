import { User } from "../../structure/entities/User";
import { Activity } from "../../structure/entities/Activity";
import { ActivityTypeEnum } from "../../helpers/enums/ActivityTypeEnum";
import { ActivityStatusEnum } from "../../helpers/enums/ActivityStatusEnum";

export interface IActivityRepo {
    create_activity(activity: Activity): Promise<boolean>
    update_activity(activity: Activity): Promise<boolean>
    update_activity_status(activity_id: string, status: ActivityStatusEnum): Promise<boolean>

    get_activity(id: string): Promise<Activity | null>
    check_activity_by_title(title: string): Promise<boolean> 
    get_users_assigned_to_activity(activity_id: string): Promise<User[]>
    get_activities_by_user_id(user_id: string, type: ActivityTypeEnum): Promise<Activity[] | null>
    get_all_activities_by_status(status: ActivityStatusEnum | ActivityStatusEnum[], type: ActivityTypeEnum): Promise<Activity[] | null> 
    
    assign_user_to_activity(activity_id: string, user_id: string): Promise<{ assign: boolean }>
    update_user_activity_status(activity_id: string, user_id: string, status: boolean): Promise<boolean>
}