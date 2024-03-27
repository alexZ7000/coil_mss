import { randomUUID } from "crypto";

import { UserMock } from "./UserMock";
import { CourseMock } from "./CourseMock";
import { CriteriaMock } from "./CriteriaMock";
import { InstitutionMock } from "./InstitutionMock";

import { Activity } from "../entities/Activity";
import { ActivityTypeEnum } from "../../helpers/enums/ActivityTypeEnum";
import { ActivityStatusEnum } from "../../helpers/enums/ActivityStatusEnum";


export class ActivityMock {
    public activities: Activity[];
    private course_mock: CourseMock = new CourseMock();
    private criteria_mock: CriteriaMock = new CriteriaMock();
    private user_mock: UserMock = new UserMock();
    private institution_mock: InstitutionMock = new InstitutionMock();

    constructor() {
        this.activities = [
            new Activity({
                id: randomUUID(),
                title: "Project 1",
                start_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
                end_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 * 2),
                description: "Project 1",
                languages: ["English", "Portuguese"],
                partner_institutions: [this.institution_mock.institutions[0]],
                criterias: [this.criteria_mock.criterias[0], this.criteria_mock.criterias[1], this.criteria_mock.criterias[2]],
                courses: [this.course_mock.courses[0], this.course_mock.courses[1], this.course_mock.courses[2]],
                status_activity: ActivityStatusEnum.ACTIVE,
                type_activity: ActivityTypeEnum.PROJECT,
                created_at: new Date(),
                updated_at: new Date(),
                applicants: [{ user: this.user_mock.users[1], status: true }, { user: this.user_mock.users[1], status: false }]
            }),
            new Activity(
                {
                    id: randomUUID(),
                    title: "Project 2",
                    start_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
                    end_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 * 2),
                    description: "Project 2",
                    languages: ["English", "Portuguese, Dutch"],
                    partner_institutions: [this.institution_mock.institutions[1]],
                    criterias: [this.criteria_mock.criterias[3], this.criteria_mock.criterias[4], this.criteria_mock.criterias[5], this.criteria_mock.criterias[0]],
                    status_activity: ActivityStatusEnum.ON_HOLD,
                    type_activity: ActivityTypeEnum.PROJECT,
                    created_at: new Date(),
                    updated_at: new Date(),
                    applicants: [{ user: this.user_mock.users[1], status: true }, { user: this.user_mock.users[1], status: false }],
                    courses: [this.course_mock.courses[3], this.course_mock.courses[4], this.course_mock.courses[0]]
                }
            ),
            new Activity(
                {
                    id: randomUUID(),
                    title: "Project 3",
                    start_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
                    end_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 * 2),
                    description: "Project 3",
                    languages: ["French", "Portuguese"],
                    courses: [this.course_mock.courses[6], this.course_mock.courses[0], this.course_mock.courses[0]],
                    partner_institutions: [this.institution_mock.institutions[0]],
                    criterias: [this.criteria_mock.criterias[0], this.criteria_mock.criterias[1], this.criteria_mock.criterias[2]],
                    status_activity: ActivityStatusEnum.TO_START,
                    type_activity: ActivityTypeEnum.PROJECT,
                    created_at: new Date(),
                    updated_at: new Date(),
                    applicants: []
                }
            ),
            new Activity(
                {
                    id: randomUUID(),
                    title: "Project 4",
                    start_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
                    end_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 * 2),
                    description: "Project 4",
                    languages: ["English", "Portuguese"],
                    partner_institutions: [this.institution_mock.institutions[1]],
                    criterias: [this.criteria_mock.criterias[3], this.criteria_mock.criterias[4], this.criteria_mock.criterias[5], this.criteria_mock.criterias[6]],
                    courses: [this.course_mock.courses[0], this.course_mock.courses[1], this.course_mock.courses[2]],
                    status_activity: ActivityStatusEnum.ENDED,
                    type_activity: ActivityTypeEnum.INTERNACIONAL_MOBILITY,
                    created_at: new Date(),
                    updated_at: new Date(),
                    applicants: [{ user: this.user_mock.users[1], status: true }, { user: this.user_mock.users[1], status: false }]
                }
            )
        ];
    }
}


