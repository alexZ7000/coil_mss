import { Project } from "../entities/Project";
import { ProjectStatusEnum } from "../../helpers/enums/ProjectStatusEnum";

export class ProjectMock {
    public projects: Project[];

    constructor() {
        this.projects = [
            new Project({
                id: 1,
                title: "Project 1",
                start_date: new Date(),
                end_date: new Date(),
                description: "Project 1",
                languages: ["English", "Portuguese"],
                partner_institutions: [],
                criterias: [],
                status_project: ProjectStatusEnum.ACTIVE,
                created_at: new Date(),
                updated_at: new Date(),
                applicants: [],
                accepted: []
            }),
            new Project(
                {
                    id: 2,
                    title: "Project 2",
                    start_date: new Date(),
                    end_date: new Date(),
                    description: "Project 2",
                    languages: ["English", "Portuguese, Dutch"],
                    partner_institutions: [],
                    criterias: [],
                    status_project: ProjectStatusEnum.ON_HOLD,
                    created_at: new Date(),
                    updated_at: new Date(),
                    applicants: [],
                    accepted: []
                }
            ),
            new Project(
                {
                    id: 3,
                    title: "Project 3",
                    start_date: new Date(),
                    end_date: new Date(),
                    description: "Project 3",
                    languages: ["French", "Portuguese"],
                    partner_institutions: [],
                    criterias: [],
                    status_project: ProjectStatusEnum.TO_START,
                    created_at: new Date(),
                    updated_at: new Date(),
                    applicants: [],
                    accepted: []
                }
            )
        ];
    }

    public get_project(id: number): Promise<Project | null>{
        return new Promise((resolve, reject) => {
            const project = this.projects.find(project => project.id === id);
            resolve(project || null);
        });
    }

    public create_project(project: Project): Promise<boolean> {
        this.projects.push(project);
        return Promise.resolve(true);
    }

    public update_project(project: Project): Promise<Project> {
        this.projects.forEach((project) => {
            if (project.id == project.id) {
                project = project;
            }
        });
        return Promise.resolve(project);
    }

    public get_project_by_title(title: string): Promise<Project | null> {
        return new Promise((resolve, reject) => {
            const project = this.projects.find(project => project.title === title);
            resolve(project || null);
        });
    }

    public get_project_by_status(status: ProjectStatusEnum): Promise<Project[]> {
        return new Promise((resolve, reject) => {
            const projects = this.projects.filter(project => project.status_project === status);
            resolve(projects);
        });
    }

    public get_all_projects(): Promise<Project[]> {
        return Promise.resolve(this.projects);
    }

    public get_project_by_language(language: string): Promise<Project[]> {
        return new Promise((resolve, reject) => {
            const projects = this.projects.filter(project => project.languages.includes(language));
            resolve(projects);
        });
    }

    public get_project_by_partner_institution(institution_id: number): Promise<Project[]> {
        return new Promise((resolve, reject) => {
            const projects = this.projects.filter(project => project.partner_institutions.some(institution => institution.id === institution_id));
            resolve(projects);
        });
    }
    
    public get_project_by_date_range(start_date: Date, end_date: Date): Promise<Project[]> {
        return new Promise((resolve, reject) => {
            const projects = this.projects.filter(project => project.start_date >= start_date && project.end_date <= end_date);
            resolve(projects);
        });
    }
}


