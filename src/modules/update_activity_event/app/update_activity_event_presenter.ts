import { Repository } from "../../../core/repositories/Repository";

const repository = new Repository({ activity_repo: true });

export const handler = async (event: any, context: any) => {
    const body = event.body;
    const resp = await repository.ActivityRepo.update_activity_status(body.activity_id, body.status);
    if (resp) {
        console.log("Activity updated successfully");
    } else {
        console.log("Activity not found");
    }
};
