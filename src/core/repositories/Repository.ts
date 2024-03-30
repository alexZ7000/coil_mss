import { UserRepoMock } from "./mocks/UserRepoMock";
import { UserRepo } from "./database/repositories/UserRepo";

import { ActivityRepoMock } from "./mocks/ProjectRepoMock";
import { ActivityRepo } from "./database/repositories/ActivityRepo";

import { InstitutionRepoMock } from "./mocks/InstitutionRepoMock";
import { InstitutionRepo } from "./database/repositories/InstitutionRepo";

import { CourseRepoMock } from "./mocks/CourseRepoMock";
import { CourseRepo } from "./database/repositories/CourseRepo";

class RepositoryProps {
    user_repo?: boolean = false;
    activity_repo?: boolean = false;
    institution_repo?: boolean = false;
    course_repo?: boolean = false;
}

export class Repository {
    public UserRepo: UserRepo | UserRepoMock;
    public ActivityRepo: ActivityRepo | ActivityRepoMock;
    public InstitutionRepo: InstitutionRepo | InstitutionRepoMock;
    public CourseRepo: CourseRepo | CourseRepoMock;

    constructor(props: RepositoryProps) {
        if (props.user_repo) {
            this.UserRepo = process.env.STAGE === 'test' ? new UserRepoMock() : new UserRepo();
        }
        if (props.activity_repo) {
            this.ActivityRepo = process.env.STAGE === 'test' ? new ActivityRepoMock() : new ActivityRepo();
        }
        if (props.institution_repo) {
            this.InstitutionRepo = process.env.STAGE === 'test' ? new InstitutionRepoMock() : new InstitutionRepo();
        }
        if (props.course_repo) {
            this.CourseRepo = process.env.STAGE === 'test' ? new CourseRepoMock() : new CourseRepo();
        }
    }
}