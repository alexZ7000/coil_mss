import { DataTypes } from 'sequelize';
import { DatabaseMain } from '../DatabaseMain';

const instance = new DatabaseMain().rd_client;

const Language = instance.define('Languages', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    language: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    language_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'languages',
    timestamps: false,
    modelName: 'Language'
});

const Country = instance.define('Countries', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    country_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'countries',
    timestamps: false,
    modelName: 'Country'
});

const SocialMedia = instance.define('SocialMedias', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'social_medias',
    timestamps: false,
    modelName: 'SocialMedias'
});

const Criteria = instance.define('Criterias', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    criteria: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'criterias',
    timestamps: false,
    modelName: 'Criterias'
});

const User = instance.define('User', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    user_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        onUpdate: new Date().toISOString()
    },
}, {
    tableName: 'users',
    timestamps: false,
    modelName: 'User'
});

const ActivityStatus = instance.define('ActivityStatus', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'activity_status',
    timestamps: false,
    modelName: 'ActivityStatus'
});

const ActivityType = instance.define('ActivityType', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'activity_types',
    timestamps: false,
    modelName: 'ActivityType'
});

const ActivityLanguage = instance.define('ActivityLanguage', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    activity_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    language_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'activity_languages',
    timestamps: false,
    modelName: 'ActivityLanguage'
});

const ActivityPartnerInstitution = instance.define('ActivityPartnerInstitution', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    activity_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    institution_id: {
        type: DataTypes.UUID,
        allowNull: false
    }
}, {
    tableName: 'activity_partner_institutions',
    timestamps: false,
    modelName: 'ActivityPartnerInstitution'
});

const ActivityCriteria = instance.define('ActivityCriteria', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    activity_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    criteria_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'activity_criterias',
    timestamps: false,
    modelName: 'ActivityCriteria'
});

const ActivityApplication = instance.define('ActivityApplication', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    activity_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        onUpdate: new Date().toISOString()
    }
}, {
    tableName: 'activity_applications',
    timestamps: false,
    modelName: 'ActivityApplication'
});

const Activity = instance.define('Activity', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    type_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        onUpdate: new Date().toISOString()
    }
}, {
    tableName: 'activities',
    timestamps: false,
    modelName: 'Activity'
});

const UserType = instance.define('UserType', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'user_types',
    timestamps: false,
    modelName: 'UserType',
});

const Course = instance.define('Course', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    course: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'courses',
    timestamps: false,
    modelName: 'Course'
});

const ActivityCourse = instance.define('ActivityCourse', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    activity_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    course_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'activity_courses',
    timestamps: false,
    modelName: 'ActivityCourse'
});

const Institution = instance.define('Institution', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'institutions',
    timestamps: false,
    modelName: 'Institution'
});

const InstitutionSocialMedia = instance.define('InstitutionSocialMedia', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    institution_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    social_media_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'institution_social_medias',
    timestamps: false,
    modelName: 'InstitutionSocialMedia',
});

const InstitutionImage = instance.define('InstitutionImage', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    institution_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'institution_images',
    timestamps: false,
    modelName: 'InstitutionImage',
});

const InstitutionCountry = instance.define('InstitutionCountry', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    institution_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    country_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'institution_countries',
    timestamps: false,
    modelName: 'InstitutionCountry',
});

// Relationships
// User
User.belongsTo(UserType, { foreignKey: 'user_type_id', as: 'user_type' });

// Activity
Activity.belongsTo(ActivityStatus, { foreignKey: 'status_id', as: 'activity_status' });
Activity.belongsTo(ActivityType, { foreignKey: 'type_id', as: 'activity_type' });

// ActivityApplication
Activity.hasMany(ActivityApplication, { foreignKey: 'activity_id', onDelete: 'CASCADE', as: 'applications' });
ActivityApplication.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// Activity Language
Activity.hasMany(ActivityLanguage, { foreignKey: 'activity_id', onDelete: 'CASCADE', as: 'languages' });
ActivityLanguage.belongsTo(Language, { foreignKey: 'language_id', as: 'language' });

// Activity Partner Institution
Activity.hasMany(ActivityPartnerInstitution, { foreignKey: 'activity_id', onDelete: 'CASCADE', as: 'partner_institutions' });
ActivityPartnerInstitution.belongsTo(Institution, { foreignKey: 'institution_id', as: 'institution' });

// Activity Criteria
Activity.hasMany(ActivityCriteria, { foreignKey: 'activity_id', onDelete: 'CASCADE', as: 'criterias' });
ActivityCriteria.belongsTo(Criteria, { foreignKey: 'criteria_id', as: 'criteria' });

// Activity Course
Activity.hasMany(ActivityCourse, { foreignKey: 'activity_id', onDelete: 'CASCADE', as: 'courses' });
ActivityCourse.belongsTo(Course, { foreignKey: 'course_id', as: 'course' });

// Institution
Institution.belongsTo(Country, { foreignKey: 'country_id', as: 'country' });
Institution.hasMany(InstitutionSocialMedia, { foreignKey: 'institution_id', onDelete: 'CASCADE', as: 'social_medias' });
Institution.hasMany(InstitutionImage, { foreignKey: 'institution_id', onDelete: 'CASCADE', as: 'images' });
Institution.hasMany(InstitutionCountry, { foreignKey: 'institution_id', onDelete: 'CASCADE', as: 'countries' });

// Institution Social Media
InstitutionSocialMedia.belongsTo(SocialMedia, { foreignKey: 'social_media_id', as: 'media' });

// Institution Country
InstitutionCountry.belongsTo(Country, { foreignKey: 'country_id', as: 'country' });

export {
    User, UserType, Course, ActivityCourse, Institution, InstitutionSocialMedia, InstitutionImage,
    Activity, ActivityStatus, ActivityType, ActivityLanguage, ActivityPartnerInstitution,
    ActivityCriteria, ActivityApplication, Language, SocialMedia, Criteria,
    Country, InstitutionCountry
};