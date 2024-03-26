import { Project } from "../../structure/entities/Project";
import { ProjectStatusEnum } from "../../helpers/enums/ProjectStatusEnum";

export interface IProjectRepo {
    get_project(id: string): Promise<Project | null>
    create_project(project: Project): Promise<boolean> 
    get_project_by_title(title: string): Promise<Project | null> 
    get_all_projects_by_status(status: ProjectStatusEnum | ProjectStatusEnum[]): Promise<Project[]> 
    get_all_projects(): Promise<Project[]> 
}