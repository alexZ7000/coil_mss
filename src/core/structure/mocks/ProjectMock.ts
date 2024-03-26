import { randomUUID } from "crypto";

import { Project } from "../entities/Project";
import { ProjectStatusEnum } from "../../helpers/enums/ProjectStatusEnum";


export class ProjectMock {
    public projects: Project[];

    constructor() {
        this.projects = [
            new Project({
                id: randomUUID(),
                title: "Project 1",
                start_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
                end_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 * 2),
                description: "Project 1",
                languages: ["English", "Portuguese"],
                partner_institutions: [],
                criterias: [],
                status_project: ProjectStatusEnum.ACTIVE,
                created_at: new Date(),
                updated_at: new Date(),
                applicants: [],
                accepted: [],
                feedbacks: []
            }),
            new Project(
                {
                    id: randomUUID(),
                    title: "Project 2",
                    start_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
                    end_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 * 2),
                    description: "Project 2",
                    languages: ["English", "Portuguese, Dutch"],
                    partner_institutions: [],
                    criterias: [],
                    status_project: ProjectStatusEnum.ON_HOLD,
                    created_at: new Date(),
                    updated_at: new Date(),
                    applicants: [],
                    accepted: [],
                    feedbacks: []
                }
            ),
            new Project(
                {
                    id: randomUUID(),
                    title: "Project 3",
                    start_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
                    end_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 * 2),
                    description: "Project 3",
                    languages: ["French", "Portuguese"],
                    partner_institutions: [],
                    criterias: [],
                    status_project: ProjectStatusEnum.TO_START,
                    created_at: new Date(),
                    updated_at: new Date(),
                    applicants: [],
                    accepted: [],
                    feedbacks: []
                }
            )
        ];
    }
}


