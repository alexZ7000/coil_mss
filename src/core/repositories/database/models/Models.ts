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
    modelName: 'UserType'
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
ActivityCourse.belongsTo(Course, { foreignKey: 'course_id', onDelete: 'CASCADE'});
Institution.hasMany(InstitutionSocialMedia, { foreignKey: 'institution_id', onDelete: 'CASCADE'});
Institution.hasMany(InstitutionImage, { foreignKey: 'institution_id', onDelete: 'CASCADE'});

export { User, UserType, Course, ActivityCourse, Institution, InstitutionSocialMedia, InstitutionImage };