import { IProjectRepo } from '../interfaces/IProjectRepo';
import { Project } from '../../structure/entities/Project';
import { ProjectMock } from '../../structure/mocks/ProjectMock';
import { ProjectStatusEnum } from "../../helpers/enums/ProjectStatusEnum";


export class ProjectRepoMock implements IProjectRepo {
    private project_mock: ProjectMock;

    constructor() {
        this.project_mock = new ProjectMock();
    }

    public async get_project(id: string) {
        return this.project_mock.projects.find(project => project.id === id) || null;
    }

    public async create_project(project: Project) {
        this.project_mock.projects.push(project);
        return true;
    }

    public async get_project_by_title(title: string) {
        return this.project_mock.projects.find(project => project.title === title) || null;
    }

    public async get_all_projects_by_status(status: ProjectStatusEnum | ProjectStatusEnum[]) {
        if (Array.isArray(status)) {
            return this.project_mock.projects.filter(project => status.includes(project.status_project));
        }
        return this.project_mock.projects.filter(project => project.status_project === status);
    }

    public async get_all_projects() {
        return this.project_mock.projects;
    }
}
