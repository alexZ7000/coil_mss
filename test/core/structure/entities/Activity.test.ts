import { it, describe, expect } from 'vitest';

import { Activity } from '../../../../src/core/structure/entities/Activity';
import { ActivityMock } from '../../../../src/core/structure/mocks/ActivityMock';
import { ActivityTypeEnum } from '../../../../src/core/helpers/enums/ActivityTypeEnum';
import { ActivityStatusEnum } from '../../../../src/core/helpers/enums/ActivityStatusEnum';
import { randomUUID } from 'crypto';


describe('Activity', () => {
    it ('should create an activity', () => {
        const activity = new Activity({
            id: randomUUID(),
            title: 'Project 1',
            start_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
            end_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 * 2),
            description: 'Project 1',
            languages: ['English', 'Portuguese'],
            partner_institutions: [],
            criterias: [],
            courses: [],
            status_activity: ActivityStatusEnum.ACTIVE,
            type_activity: ActivityTypeEnum.PROJECT,
            created_at: new Date(),
            updated_at: new Date(),
            applicants: []
        });

        expect(activity).toBeInstanceOf(Activity);
    });

    it ('should create an activity using ActivityMock', () => {
        const activityMock = new ActivityMock();
        const activity = activityMock.activities[0];

        expect(activity).toBeInstanceOf(Activity);
    });
    
    it ('should not create an activity without a title', () => {
        const activityMock = new ActivityMock();
        const activity = activityMock.activities[0];
        activity.title = '';

        expect(() => new Activity(activity)).toThrowError('EntityError: Parameter title is required');
    });

    it ('should not create an activity without a start date', () => {
        const activityMock = new ActivityMock();
        const activity = activityMock.activities[0];
        activity.start_date = null;

        expect(() => new Activity(activity)).toThrowError('EntityError: Parameter start_date is required');
    });

    it ('should not create an activity without an end date', () => {
        const activityMock = new ActivityMock();
        const activity = activityMock.activities[0];
        activity.end_date = null;

        expect(() => new Activity(activity)).toThrowError('EntityError: Parameter end_date is required');
    });

    it ('should not create an activity without a description', () => {
        const activityMock = new ActivityMock();
        const activity = activityMock.activities[0];
        activity.description = '';

        expect(() => new Activity(activity)).toThrowError('EntityError: Parameter description is required');
    });

    it ('should not create an activity without status activity', () => {
        const activityMock = new ActivityMock();
        const activity = activityMock.activities[0];
        activity.status_activity = null;

        expect(() => new Activity(activity)).toThrowError('EntityError: Parameter status_activity is required');
    });

    it ('should not create an activity without type activity', () => {
        const activityMock = new ActivityMock();
        const activity = activityMock.activities[0];
        activity.type_activity = null;

        expect(() => new Activity(activity)).toThrowError('EntityError: Parameter type_activity is required');
    });

    it ('should not create an activity without created at', () => {
        const activityMock = new ActivityMock();
        const activity = activityMock.activities[0];
        activity.created_at = null;

        expect(() => new Activity(activity)).toThrowError('EntityError: Parameter created_at is required');
    });

    it ('should not create an activity without updated at', () => {
        const activityMock = new ActivityMock();
        const activity = activityMock.activities[0];
        activity.updated_at = null;

        expect(() => new Activity(activity)).toThrowError('EntityError: Parameter updated_at is required');
    });
});