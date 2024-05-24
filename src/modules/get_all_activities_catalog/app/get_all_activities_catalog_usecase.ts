import { TokenAuth } from "../../../core/helpers/functions/token_auth";
import { IUserRepo } from "../../../core/repositories/interfaces/IUserRepo";
import { ActivityTypeEnum } from "../../../core/helpers/enums/ActivityTypeEnum";
import { IActivityRepo } from "../../../core/repositories/interfaces/IActivityRepo";


export class GetAllActivitiesCatalogUsecase {
  public token_auth: TokenAuth;
  public activity_repo: IActivityRepo; 

  constructor(activity_repo: IActivityRepo) {
    this.token_auth = new TokenAuth();
    this.activity_repo = activity_repo;
  }

  async execute() {
    const activities = await this.activity_repo.get_all_activities_catalog();
    
    const projects = activities ? activities.filter((activity) => activity.type_activity === ActivityTypeEnum.PROJECT) : null;
    const mobilities = activities ? activities.filter((activity) => activity.type_activity === ActivityTypeEnum.ACADEMIC_MOBILITY) : null;

    const response = {
      projects: projects,
      mobilities: mobilities
    }
    
    return response;
  }
}
