import dotenv from 'dotenv';
import { randomUUID } from 'crypto';

// Models
import {
    User, Course, UserType, ActivityCourse, Institution, InstitutionImage, InstitutionSocialMedia,
    ActivityStatus, ActivityType, Activity, ActivityApplication, ActivityLanguage, ActivityCriteria, ActivityPartnerInstitution,
    Language, Criteria, SocialMedia, Country, InstitutionCountry
} from './src/core/repositories/database/models/Models';

// Enums
import { UserTypeEnum } from './src/core/helpers/enums/UserTypeEnum';
import { ActivityTypeEnum } from './src/core/helpers/enums/ActivityTypeEnum';
import { ActivityStatusEnum } from './src/core/helpers/enums/ActivityStatusEnum';

// Mocks
import { CourseMock } from './src/core/structure/mocks/CourseMock';
import { CountryMock } from './src/core/structure/mocks/CountryMock';
import { CriteriaMock } from './src/core/structure/mocks/CriteriaMock';
import { LanguageMock } from './src/core/structure/mocks/LanguageMock';
import { SocialMediaMock } from './src/core/structure/mocks/SocialMediaMock';

// User Entity
import { User as UserEntity } from './src/core/structure/entities/User';
import { Institution as InstitutionEntity } from './src/core/structure/entities/Institution';

dotenv.config();
const stage = process.env.STAGE || "";

// Getting mocks
const users: UserEntity[] = [
    new UserEntity({
        id: randomUUID(),
        name: "Relações Internacionais",
        email: "relacoes-internacionais@maua.br",
        user_type: UserTypeEnum.ADMIN,
        created_at: new Date(),
        updated_at: new Date()
    })
]
stage === "dev" || stage === "test" ? users.push(new UserEntity({
    id: "764f9730-433c-42df-b0bc-517fcf3778be",
    name: "Felipe Carillo",
    email: "23.00765-6@maua.br",
    user_type: UserTypeEnum.ADMIN,
    created_at: new Date(),
    updated_at: new Date()
})) : null;

const institutions: InstitutionEntity[] = [
    new InstitutionEntity({
        id: randomUUID(),
        name: "Fontys University of Applied Sciences",
        description: "Fontys University of Applied Sciences is a Dutch university of applied sciences with over 44,000 students in several campuses located in the southern Netherlands.",
        email: "test@test.com",
        countries: [
            { id: new CountryMock().countries[0].id }
        ],
        social_medias: [
            { id: new SocialMediaMock().social_medias[0].id, link: "https://www.facebook.com/Fontys/" },
            { id: new SocialMediaMock().social_medias[1].id, link: "https://www.instagram.com/fontys/" },
        ],
        images: [
            "https://th.bing.com/th/id/OIP.3cEyScEWFEowrqodJh7LUAHaHZ?rs=1&pid=ImgDetMain"
        ]
    }),
]

const courses: CourseMock = new CourseMock();
const countries: CountryMock = new CountryMock();
const languages: LanguageMock = new LanguageMock();
const criterias: CriteriaMock = new CriteriaMock();
const social_medias: SocialMediaMock = new SocialMediaMock();
const userTypes: UserTypeEnum[] = [
    UserTypeEnum.ADMIN, UserTypeEnum.STUDENT, UserTypeEnum.MODERATOR
];
const activityStatuses: ActivityStatusEnum[] = [
    ActivityStatusEnum.CANCELED, ActivityStatusEnum.ACTIVE, ActivityStatusEnum.ON_HOLD, ActivityStatusEnum.ENDED, ActivityStatusEnum.TO_START
];
const activityTypes: ActivityTypeEnum[] = [
    ActivityTypeEnum.ACADEMIC_MOBILITY, ActivityTypeEnum.PROJECT
];

// Create or update the database
async function handleDatabaseCreation(): Promise<void> {
    const models = [
        UserType, Course, SocialMedia, Language, Country, Criteria, Institution, User,
        ActivityStatus, ActivityType, InstitutionImage, InstitutionSocialMedia,
        InstitutionCountry, Activity, ActivityApplication, ActivityLanguage,
        ActivityCriteria, ActivityPartnerInstitution, ActivityCourse
    ];

    for (const model of models) {
        await model.sync({ alter: true });
    }
    console.log("Database checked/created");
}

// Create or update users
async function createOrUpdateUser(user: UserEntity): Promise<void> {
    let existing = await User.findOne({ where: { email: user.email } });
    if (!existing) {
        await User.create({
            id: user.id,
            name: user.name,
            email: user.email,
            user_type_id: user.user_type,
            created_at: user.created_at,
            updated_at: user.updated_at
        });
        console.log(`User ${user.email} created`);
    } else {
        await User.update({
            name: user.name,
            user_type: user.user_type,
            updated_at: user.updated_at
        }, { where: { email: user.email } });
        console.log(`User ${user.email} updated`);
    }
    console.log("Users checked/created");
}

// Create or update courses
async function handleCoursesCreation(): Promise<void> {
    for (const course of courses.courses) {
        let existingCourse = await Course.findOne({ where: { course: course.course } });
        if (!existingCourse) {
            await Course.create({ course: course.course });
            console.log(`Course ${course.course} created`);
        } else {
            await Course.update({ course: course.course }, { where: { course: course.course } });
            console.log(`Course ${course.course} updated`);
        }
    }
}

// Create or update languages
async function handleLanguagesCreation(): Promise<void> {
    for (const language of languages.languages) {
        let existingLanguage = await Language.findOne({ where: { language: language.language } });
        if (!existingLanguage) {
            await Language.create({ language: language.language, language_code: language.language_code });
            console.log(`Language ${language.language} created`);
        } else {
            await Language.update({ language: language.language, language_code: language.language_code }, { where: { language: language.language } });
            console.log(`Language ${language.language} updated`);
        }
    }
    console.log("Languages checked/created");
}

// Create or update countries
async function handleCountriesCreation(): Promise<void> {
    for (const country of countries.countries) {
        let existingCountry = await Country.findOne({ where: { country: country.country } });
        if (!existingCountry) {
            await Country.create({ country: country.country, country_code: country.country_code });
            console.log(`Country ${country.country} created`);
        } else {
            await Country.update({ country: country.country, country_code: country.country_code }, { where: { country: country.country } });
            console.log(`Country ${country.country} updated`);
        }
    }
    console.log("Countries checked/created");
}

// Create or update criterias
async function handleCriteriasCreation(): Promise<void> {
    for (const criteria of criterias.criterias) {
        let existingCriteria = await Criteria.findOne({ where: { criteria: criteria.criteria } });
        if (!existingCriteria) {
            await Criteria.create({ criteria: criteria.criteria });
            console.log(`Criteria ${criteria.criteria} created`);
        } else {
            await Criteria.update({ criteria: criteria.criteria }, { where: { criteria: criteria.criteria } });
            console.log(`Criteria ${criteria.criteria} updated`);
        }
    }
    console.log("Criterias checked/created");
}

// Create or update enums
async function createOrUpdateEnumItems(model: any, items: any[], enumType: any): Promise<void> {
    for (const item of items) {
        let existingItem = await model.findOne({ where: { id: item } });
        if (!existingItem) {
            await model.create({ name: enumType[item] });
            console.log(`${model.name} ${item} created`);
        } else {
            await model.update({ name: enumType[item] }, { where: { id: item } });
            console.log(`${model.name} ${item} updated`);
        }
    }
    console.log(`${model.name} checked/created`);
}

// Create or update social media
async function createOrUpdateSocialMedia(): Promise<void> {
    for (const socialMedia of social_medias.social_medias) {
        let existingSocialMedia = await SocialMedia.findOne({ where: { name: socialMedia.social_media } });
        if (!existingSocialMedia) {
            await SocialMedia.create({
                name: socialMedia.social_media,
            });
            console.log(`Social Media ${socialMedia.social_media} created`);
        } else {
            await SocialMedia.update(socialMedia, { where: { name: socialMedia.social_media } });
            console.log(`Social Media ${socialMedia.social_media} updated`);
        }
    }
    console.log("Social Media checked/created");
}


async function createOrUpdateInstitution(institution: InstitutionEntity): Promise<void> {
    let existingInstitution = await Institution.findOne({ where: { name: institution.name } });
    if (!existingInstitution) {
        await Institution.create({
            id: institution.id,
            name: institution.name,
            description: institution.description,
            email: institution.email,
            created_at: new Date(),
            updated_at: new Date()
        });
        await InstitutionCountry.create({
            institution_id: institution.id,
            country_id: countries.countries[0].id
        });
        await InstitutionSocialMedia.create({
            institution_id: institution.id,
            social_media_id: social_medias.social_medias[0].id,
            link: institution.social_medias[0].link
        });
        await InstitutionImage.create({
            institution_id: institution.id,
            image: institution.images[0]
        });
        console.log(`Institution ${institution.name} created`);
    } else {
        await Institution.update({
            name: institution.name,
            description: institution.description,
            email: institution.email,
            updated_at: new Date()
        }, { where: { name: institution.name } });
        await InstitutionCountry.update({
            institution_id: institution.id,
            country_id: countries.countries[0].id
        }, { where: { institution_id: institution.id } });
        await InstitutionSocialMedia.update({
            institution_id: institution.id,
            social_media_id: social_medias.social_medias[0].id,
            link: institution.social_medias[0].link
        }, { where: { institution_id: institution.id } });
        await InstitutionImage.update({
            institution_id: institution.id,
            image: institution.images[0]
        }, { where: { institution_id: institution.id } });
        console.log(`Institution ${institution.name} updated`);
    }
    console.log("Institutions checked/created");
}

(async () => {
    try {
        await handleDatabaseCreation();

        await handleCoursesCreation();

        await handleLanguagesCreation();

        await handleCountriesCreation();

        await handleCriteriasCreation();

        await createOrUpdateSocialMedia();

        await createOrUpdateEnumItems(UserType, userTypes, UserTypeEnum);
        await createOrUpdateEnumItems(ActivityStatus, activityStatuses, ActivityStatusEnum);
        await createOrUpdateEnumItems(ActivityType, activityTypes, ActivityTypeEnum);

        for (const user of users) {
            await createOrUpdateUser(user);
        }

        await createOrUpdateInstitution(institutions[0]);

    } catch (error) {
        console.error(error);
    }
})();
