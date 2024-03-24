import { UserRepo } from "./database/UserRepo";
import { UserRepoMock } from "./mocks/UserRepoMock";

class RepositoryProps {
    user_repo: boolean = false;
    project_repo: boolean = false;
}

export class Repository {
    public UserRepo: UserRepo | UserRepoMock;

    constructor({ user_repo = false, project_repo = false }: RepositoryProps) {
        if (user_repo) {
            this.UserRepo = process.env.STAGE === 'test' ? new UserRepoMock() : new UserRepo();
        }
        if (project_repo) {
            // this.ProjectRepo = process.env.STAGE === 'test' ? new ProjectRepoMock() : new ProjectRepo();
        }
    }
}