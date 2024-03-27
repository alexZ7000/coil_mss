import { DatabaseMain } from './DatabaseMain';
import { IProjectRepo } from '../interfaces/IProjectRepo';
import { Project } from '../../structure/entities/Project';
import { NotFoundError } from '../../helpers/errors/RepoError';

import { ProjectStatusEnum } from '../../helpers/enums/ProjectStatusEnum';


export class ProjectRepo implements IProjectRepo {
    private database: DatabaseMain;

    constructor(database: DatabaseMain) {
        this.database = database;
    }

    public async get_project(projectId: string): Promise<Project> {
        throw new NotFoundError("Project not found");
    }

    public async create_project(project: Project): Promise<boolean> {
        return true;   
    }

    public async get_all_projects(): Promise<Project[]> {
        return [];
    }

    public async get_all_projects_by_status(status: ProjectStatusEnum | ProjectStatusEnum[]): Promise<Project[]> {
        return [];
    }

    public async get_project_by_title(title: string): Promise<Project | null> {
        return null;
    }
}


    
    
