import { UserRepoMock } from "./mocks/UserRepoMock";
import { UserRepo } from "./database/repositories/UserRepo";

import { ActivityRepoMock } from "./mocks/ActivityRepoMock";
import { ActivityRepo } from "./database/repositories/ActivityRepo";

import { InstitutionRepoMock } from "./mocks/InstitutionRepoMock";
import { InstitutionRepo } from "./database/repositories/InstitutionRepo";

import { CourseRepoMock } from "./mocks/CourseRepoMock";
import { CourseRepo } from "./database/repositories/CourseRepo";

import { LanguageRepoMock } from "./mocks/LanguageRepoMock";
import { LanguageRepo } from "./database/repositories/LanguageRepo";

import { CountryRepoMock } from "./mocks/CountryRepoMock";
import { CountryRepo } from "./database/repositories/CountryRepo";

import { CriteriaRepoMock } from "./mocks/CriteriaRepoMock";
import { CriteriaRepo } from "./database/repositories/CriteriaRepo";

import { SocialMediaRepoMock } from "./mocks/SocialMediaRepoMock";
import { SocialMediaRepo } from "./database/repositories/SocialMediaRepo";

class RepositoryProps {
    user_repo?: boolean = false;
    course_repo?: boolean = false;
    country_repo?: boolean = false;
    criteria_repo?: boolean = false;
    activity_repo?: boolean = false;
    language_repo?: boolean = false;
    institution_repo?: boolean = false;
    social_media_repo?: boolean = false;
}

export class Repository {
    public UserRepo: UserRepo | UserRepoMock;
    public CourseRepo: CourseRepo | CourseRepoMock;
    public CountryRepo: CountryRepo | CountryRepoMock;
    public CriteriaRepo: CriteriaRepo | CriteriaRepoMock;
    public ActivityRepo: ActivityRepo | ActivityRepoMock;
    public LanguageRepo: LanguageRepo | LanguageRepoMock;
    public SocialMediaRepo: SocialMediaRepo | SocialMediaRepoMock;
    public InstitutionRepo: InstitutionRepo | InstitutionRepoMock;

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
        if (props.language_repo) {
            this.LanguageRepo = process.env.STAGE === 'test' ? new LanguageRepoMock() : new LanguageRepo();
        }
        if (props.criteria_repo) {
            this.CriteriaRepo = process.env.STAGE === 'test' ? new CriteriaRepoMock() : new CriteriaRepo();
        }
        if (props.country_repo) {
            this.CountryRepo = process.env.STAGE === 'test' ? new CountryRepoMock() : new CountryRepo();
        }
        if (props.social_media_repo) {
            this.SocialMediaRepo = process.env.STAGE === 'test' ? new SocialMediaRepoMock() : new SocialMediaRepo();
        }
    }
}