import { UserMock } from "./UserMock";
import { CourseMock } from "./CourseMock";
import { CriteriaMock } from "./CriteriaMock";
import { LanguageMock } from "./LanguageMock";
import { InstitutionMock } from "./InstitutionMock";

import { Activity } from "../entities/Activity";
import { ActivityTypeEnum } from "../../helpers/enums/ActivityTypeEnum";
import { ActivityStatusEnum } from "../../helpers/enums/ActivityStatusEnum";

export class ActivityMock {
  public activities: Activity[];
  private user_mock: UserMock = new UserMock();
  private course_mock: CourseMock = new CourseMock();
  private criteria_mock: CriteriaMock = new CriteriaMock();
  private languages_mock: LanguageMock = new LanguageMock();
  private institution_mock: InstitutionMock = new InstitutionMock();

  constructor() {
    this.activities = [
      new Activity({
        id: "9166c7b4-6c42-4977-aebe-d87734a5a9c5",
        title: "Project 1",
        start_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        end_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 * 2),
        description: "Project 1",
        languages: [
          { id: this.languages_mock.languages[0].id, language: this.languages_mock.languages[0] },
          { id: this.languages_mock.languages[1].id, language: this.languages_mock.languages[1] },
          { id: this.languages_mock.languages[2].id, language: this.languages_mock.languages[2] },
        ],
        partner_institutions: [
          { id: this.institution_mock.institutions[0].id, institution: this.institution_mock.institutions[0] }
        ],
        criterias: [
          { id: this.criteria_mock.criterias[0].id, criteria: this.criteria_mock.criterias[0] },
          { id: this.criteria_mock.criterias[1].id, criteria: this.criteria_mock.criterias[1] },
          { id: this.criteria_mock.criterias[2].id, criteria: this.criteria_mock.criterias[2] },
        ],
        courses: [
          { id: this.course_mock.courses[0].id, course: this.course_mock.courses[0] },
          { id: this.course_mock.courses[1].id, course: this.course_mock.courses[1] },
          { id: this.course_mock.courses[2].id, course: this.course_mock.courses[2] },
        ],
        status_activity: ActivityStatusEnum.ACTIVE,
        type_activity: ActivityTypeEnum.PROJECT,
        created_at: new Date(),
        updated_at: new Date(),
        applicants: [{ id: this.user_mock.users[1].id, status: true }]
      }),
      new Activity({
        id: "9166c7b4-6c42-4977-aebe-d87734a5a9c6",
        title: "Project 2",
        start_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        end_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 * 2),
        description: "Project 2",
        languages: [
          { id: this.languages_mock.languages[3].id, language: this.languages_mock.languages[3] },
          { id: this.languages_mock.languages[4].id, language: this.languages_mock.languages[4] },
          { id: this.languages_mock.languages[5].id, language: this.languages_mock.languages[5] },
        ],
        partner_institutions: [
          { id: this.institution_mock.institutions[1].id, institution: this.institution_mock.institutions[1] }
        ],
        criterias: [
          { id: this.criteria_mock.criterias[3].id, criteria: this.criteria_mock.criterias[3] },
          { id: this.criteria_mock.criterias[4].id, criteria: this.criteria_mock.criterias[4] },
          { id: this.criteria_mock.criterias[5].id, criteria: this.criteria_mock.criterias[5] },
          { id: this.criteria_mock.criterias[6].id, criteria: this.criteria_mock.criterias[6] },
        ],
        status_activity: ActivityStatusEnum.ON_HOLD,
        type_activity: ActivityTypeEnum.PROJECT,
        created_at: new Date(),
        updated_at: new Date(),
        applicants: [
          { id: this.user_mock.users[1].id, status: true },
          { id: this.user_mock.users[1].id, status: false },
        ],
        courses: [
          { id: this.course_mock.courses[3].id, course: this.course_mock.courses[3] },
          { id: this.course_mock.courses[4].id, course: this.course_mock.courses[4] },
          { id: this.course_mock.courses[5].id, course: this.course_mock.courses[5] },
        ]
      }),
      new Activity({
        id: "9166c7b4-6c42-4977-aebe-d87734a5a9c7",
        title: "Project 3",
        start_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        end_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 * 2),
        description: "Project 3",
        languages: [
          { id: this.languages_mock.languages[6].id, language: this.languages_mock.languages[6] },
          { id: this.languages_mock.languages[7].id, language: this.languages_mock.languages[7] },
          { id: this.languages_mock.languages[8].id, language: this.languages_mock.languages[8] },
        ],
        courses: [
          { id: this.course_mock.courses[6].id, course: this.course_mock.courses[6] },
          { id: this.course_mock.courses[7].id, course: this.course_mock.courses[7] },
          { id: this.course_mock.courses[8].id, course: this.course_mock.courses[8] },
        ],
        partner_institutions: [this.institution_mock.institutions[0]],
        criterias: [
          { id: this.criteria_mock.criterias[7].id, criteria: this.criteria_mock.criterias[7] },
          { id: this.criteria_mock.criterias[8].id, criteria: this.criteria_mock.criterias[8] },
          { id: this.criteria_mock.criterias[9].id, criteria: this.criteria_mock.criterias[9] },
        ],
        status_activity: ActivityStatusEnum.TO_START,
        type_activity: ActivityTypeEnum.PROJECT,
        created_at: new Date(),
        updated_at: new Date(),
        applicants: [],
      }),
      new Activity({
        id: "9166c7b4-6c42-4977-aebe-d87734a5a9c8",
        title: "Project 4",
        start_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        end_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 * 2),
        description: "Project 4",
        languages: [
          { id: this.languages_mock.languages[9].id, language: this.languages_mock.languages[9] },
          { id: this.languages_mock.languages[10].id, language: this.languages_mock.languages[10] },
          { id: this.languages_mock.languages[11].id, language: this.languages_mock.languages[11] },
        ],
        partner_institutions: [this.institution_mock.institutions[1]],
        criterias: [
          { id: this.criteria_mock.criterias[10].id, criteria: this.criteria_mock.criterias[10] },
          { id: this.criteria_mock.criterias[11].id, criteria: this.criteria_mock.criterias[11] },
          { id: this.criteria_mock.criterias[12].id, criteria: this.criteria_mock.criterias[12] },
        ],
        courses: [
          { id: this.course_mock.courses[9].id, course: this.course_mock.courses[9] },
          { id: this.course_mock.courses[10].id, course: this.course_mock.courses[10] },
        ],
        status_activity: ActivityStatusEnum.ENDED,
        type_activity: ActivityTypeEnum.ACADEMIC_MOBILITY,
        created_at: new Date(),
        updated_at: new Date(),
        applicants: [
          { id: this.user_mock.users[1].id, status: true },
          { id: this.user_mock.users[1].id, status: false },
        ],
      }),
    ];
  }
}
