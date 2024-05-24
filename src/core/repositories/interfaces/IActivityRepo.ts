import { Activity } from "../../structure/entities/Activity";
import { ActivityTypeEnum } from "../../helpers/enums/ActivityTypeEnum";
import { ActivityStatusEnum } from "../../helpers/enums/ActivityStatusEnum";

export interface IActivityRepo {
    create_activity(activity: Activity): Promise<boolean>
    update_activity(activity: Activity): Promise<boolean>
    update_activity_status(activity_id: string, status: ActivityStatusEnum): Promise<boolean>

    check_activity_by_id(id: string): Promise<boolean>
    check_activity_by_title(title: string): Promise<boolean>
    check_activity_enrolled_by_user(user_id: string, activity_id: string): Promise<boolean>

    get_all_activities_catalog(): Promise<{ title: string; logo: string; type_activity: ActivityTypeEnum; }[]>
    get_activity(id: string, applicants?: boolean): Promise<Activity | null>
    get_activities_by_user_id(user_id: string, type: ActivityTypeEnum): Promise<Activity[] | null>
    get_activity_applicant(activity_id: string, user_id: string): Promise<{ user_id: string, status: boolean } | null>
    get_activity_applicants(activity_id: string, applicants: string[]): Promise<{ user_id: string, status: boolean }[]>
    get_all_activities_by_status(status: ActivityStatusEnum | ActivityStatusEnum[], type: ActivityTypeEnum): Promise<Activity[] | null>

    assign_user_to_activity(activity_id: string, user_id: string): Promise<{ assign: boolean }>
    update_users_activity_status(activity_id: string, users: { user_id: string, status: boolean }[]): Promise<boolean>
}