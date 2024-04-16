import { DataTypes } from 'sequelize';
import { DatabaseMain } from '../DatabaseMain';

const instance = new DatabaseMain().rd_client;

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
    course_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    semester: {
        type: DataTypes.INTEGER,
        allowNull: true
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
    language: {
        type: DataTypes.STRING,
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
    criteria: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'activity_criterias',
    timestamps: false,
    modelName: 'ActivityCriteria'
});

const ActivityApplication = instance.define('ActivityApplication', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
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
        type: DataTypes.INTEGER,
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
    name: {
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
    },
    country: {
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
    media: {
        type: DataTypes.STRING,
        allowNull: false
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'institution_social_media',
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

User.belongsTo(Course, { foreignKey: 'course_id', onDelete: 'SET NULL' });
User.belongsTo(UserType, { foreignKey: 'user_type_id' });
User.hasMany(ActivityApplication, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Course.hasMany(ActivityCourse, { foreignKey: 'course_id', onDelete: 'CASCADE' });
Activity.belongsTo(ActivityStatus, { foreignKey: 'status_id' });
Activity.belongsTo(ActivityType, { foreignKey: 'type_id' });
Activity.hasMany(ActivityApplication, { foreignKey: 'activity_id', onDelete: 'CASCADE' });
Activity.hasMany(ActivityLanguage, { foreignKey: 'activity_id', onDelete: 'CASCADE' });
Activity.hasMany(ActivityPartnerInstitution, { foreignKey: 'activity_id', onDelete: 'CASCADE' });
Activity.hasMany(ActivityCriteria, { foreignKey: 'activity_id', onDelete: 'CASCADE' });
Activity.hasMany(ActivityCourse, { foreignKey: 'activity_id', onDelete: 'CASCADE' });
ActivityCourse.belongsTo(Course, { foreignKey: 'course_id', onDelete: 'CASCADE' });
Institution.hasMany(InstitutionSocialMedia, { foreignKey: 'institution_id', onDelete: 'CASCADE' });
Institution.hasMany(InstitutionImage, { foreignKey: 'institution_id', onDelete: 'CASCADE' });

export {
    User, UserType, Course, ActivityCourse, Institution, InstitutionSocialMedia, InstitutionImage,
    Activity, ActivityStatus, ActivityType, ActivityLanguage, ActivityPartnerInstitution, ActivityCriteria, ActivityApplication
};