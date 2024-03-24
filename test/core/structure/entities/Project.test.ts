import { it, describe, expect } from 'vitest';

import { Project } from '../../../../src/core/structure/entities/Project';
import { ProjectStatusEnum } from '../../../../src/core/helpers/enums/ProjectStatusEnum';
import { EntityError } from '../../../../src/core/helpers/errors/EntityError';
import { ProjectMock } from '../../../../src/core/structure/mocks/ProjectMock';
import { PROVIDER_ERROR_KEY } from 'aws-cdk-lib/cx-api';

describe("Testing Project Entity", () => {
    const project_mock = new ProjectMock().projects;
    it("should create a project", async () => {
        var project = project_mock[1];

        expect(project.id).toBe(project_mock[1].id);
        expect(project.title).toBe(project_mock[1].title);
        expect(project.start_date).toBe(project_mock[1].start_date);
        expect(project.end_date).toBe(project_mock[1].end_date);
        expect(project.description).toBe(project_mock[1].description);
        expect(project.languages).toBe(project_mock[1].languages);
        expect(project.partner_institutions).toBe(project_mock[1].partner_institutions);
        expect(project.criterias).toBe(project_mock[1].criterias);
        expect(project.status_project).toBe(ProjectStatusEnum.ACTIVE);
        expect(project.created_at).toBe(project_mock[1].created_at);
        expect(project.updated_at).toBe(project_mock[1].updated_at);
        expect(project.applicants).toBe(project_mock[1].applicants);
        expect(project.accepted).toBe(project_mock[1].accepted);
    });

    it("should not create a project without id", async () => {
        var project = project_mock[1];
        project.id = 0;

        expect(() => {
            new Project(project);
        }).toThrowError(EntityError);
    });

    it("should not create a project without title", async () => {
        var project = project_mock[1];
        project.title = '';

        expect(() => {
            new Project(project);
        }).toThrowError(EntityError);
    });

    it("should not create a project without start_date", async () => {
        var project = project_mock[1];
        project.start_date = new Date();

        expect(() => {
            new Project(project);
        }).toThrowError(EntityError);
    });

    it("should not create a project without end_date", async () => {
        var project = project_mock[1];
        project.end_date = new Date();

        expect(() => {
            new Project(project);
        }).toThrowError(EntityError);
    });

    it("should not create a project without description", async () => {
        var project = project_mock[1];
        project.description = '';

        expect(() => {
            new Project(project);
        }).toThrowError(EntityError);
    });
    
    it("should not create a project without languages", async () => {
        var project = project_mock[1];
        project.languages = [];

        expect(() => {
            new Project(project);
        }).toThrowError(EntityError);
    });

    it("should not create a project without partner_institutions", async () => {
        var project = project_mock[1];
        project.partner_institutions = [];

        expect(() => {
            new Project(project);
        }).toThrowError(EntityError);
    });

    it("should not create a project without criterias", async () => {
        var project = project_mock[1];
        project.criterias = [];

        expect(() => {
            new Project(project);
        }).toThrowError(EntityError);
    });

    it("should not create a project without status_project", async () => {
        var project = project_mock[1];
        project.status_project = ProjectStatusEnum.NEEDS_MORE_DATA;

        expect(() => {
            new Project(project);
        }).toThrowError(EntityError);
    });

    it("should not create a project without created_at", async () => {
        var project = project_mock[1];
        project.created_at = new Date();

        expect(() => {
            new Project(project);
        }).toThrowError(EntityError);
    });
    
    it("should not create a project without updated_at", async () => {
        var project = project_mock[1];
        project.updated_at = new Date();

        expect(() => {
            new Project(project);
        }).toThrowError(EntityError);
    });
});