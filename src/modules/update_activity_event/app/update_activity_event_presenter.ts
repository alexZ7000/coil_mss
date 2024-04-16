
import { Repository } from "../../../core/repositories/Repository";

const repository = new Repository({ activity_repo: true });


export const handler = async (event: any, context: any) => {
    const resp = await repository.ActivityRepo.update_activity_status(event.activity_id, event.status);
    console.log(resp);
};
