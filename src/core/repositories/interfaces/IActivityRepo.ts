import { User } from "../../structure/entities/User";
import { Activity } from "../../structure/entities/Activity";
import { ActivityTypeEnum } from "../../helpers/enums/ActivityTypeEnum";
import { ActivityStatusEnum } from "../../helpers/enums/ActivityStatusEnum";

export interface IActivityRepo {
    create_activity(activity: Activity): Promise<boolean>

    get_activity(id: string): Promise<Activity | null>
    get_activity_by_title(title: string): Promise<Activity | null> 
    get_users_assigned_to_activity(activity_id: string): Promise<User[]>
    check_activity_enrolled_by_user(user_id: string, activity_id: string): Promise<boolean>
    get_activities_by_user_id(user_id: string, activity_type: ActivityTypeEnum): Promise<Activity[] | null>
    get_all_activities_by_status(status: ActivityStatusEnum | ActivityStatusEnum[], type: ActivityTypeEnum): Promise<Activity[] | null> 
    
    assign_user_to_activity(activity_id: string, user_id: string): Promise<boolean>
    remove_user_from_activity(activity_id: string, user_id: string): Promise<boolean>
    update_user_activity_status(activity_id: string, user_id: string, status: ActivityStatusEnum): Promise<boolean>
}