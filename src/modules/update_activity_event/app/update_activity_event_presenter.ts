import { Repository } from "../../../core/repositories/Repository";
import { EventBridgeManager } from "../../../core/helpers/functions/event_bridge";
import { ActivityStatusEnum } from "../../../core/helpers/enums/ActivityStatusEnum";

const repository = new Repository({ activity_repo: true });

export const handler = async (event: any, context: any) => {
    const event_bridge = new EventBridgeManager();
    console.log("Event: ", event);
    const body: { activity_id: string; status_activity: ActivityStatusEnum } = event.body;
    console.log("Activity ID: ", body.activity_id + " Status: " + body.status_activity);
    const resp = await repository.ActivityRepo.update_activity_status(body.activity_id, body.status_activity);
    if (resp) {
        console.log("Activity updated successfully");
        let event_name = body.status_activity === ActivityStatusEnum.ACTIVE ? "START_ACTIVITY_" : "END_ACTIVITY_";
        await event_bridge.delete_trigger(event_name + body.activity_id, "Update_Activity_Event");
    } else {
        console.log("Activity not found");
    }
};
