import { TokenAuth } from "../../../core/helpers/functions/token_auth";
import { IInstitutionRepo } from "../../../core/repositories/interfaces/IInstitutionRepo";
import { ActivityTypeEnum } from "../../../core/helpers/enums/ActivityTypeEnum";
import { IActivityRepo } from "../../../core/repositories/interfaces/IActivityRepo";


export class GetCatalogUsecase {
  public token_auth: TokenAuth;
  public activity_repo: IActivityRepo;
  public institution_repo: IInstitutionRepo; 

  constructor(activity_repo: IActivityRepo, institution_repo: IInstitutionRepo) {
    this.token_auth = new TokenAuth();
    this.activity_repo = activity_repo;
    this.institution_repo = institution_repo;
  }

  async execute() {
    const activities = await this.activity_repo.get_all_activities_catalog();
    const institutions = await this.institution_repo.get_all_institutions();
    
    const projects = activities ? activities.filter((activity) => activity.type_activity === ActivityTypeEnum.PROJECT) : null;
    const mobilities = activities ? activities.filter((activity) => activity.type_activity === ActivityTypeEnum.ACADEMIC_MOBILITY) : null;

    const response = {
      projects: projects,
      mobilities: mobilities,
      institutions: institutions
    }
    
    return response;
  }
}
