import { it, describe, expect } from 'vitest';

import { Project } from '../../../../src/core/structure/entities/Project';
import { EntityError } from '../../../../src/core/helpers/errors/EntityError';
import { ProjectMock } from '../../../../src/core/structure/mocks/ProjectMock';


describe("Testing Project Entity", () => {
    it("should create a project", async () => {
        const project_mock = new ProjectMock().projects;
        var project = project_mock[1];

        expect(project.id).toBe(project_mock[1].id);
        expect(project.title).toBe(project_mock[1].title);
        expect(project.start_date).toBe(project_mock[1].start_date);
        expect(project.end_date).toBe(project_mock[1].end_date);
        expect(project.description).toBe(project_mock[1].description);
        expect(project.languages).toBe(project_mock[1].languages);
        expect(project.partner_institutions).toBe(project_mock[1].partner_institutions);
        expect(project.criterias).toBe(project_mock[1].criterias);
        expect(project.status_project).toBe(project_mock[1].status_project);
        expect(project.created_at).toBe(project_mock[1].created_at);
        expect(project.updated_at).toBe(project_mock[1].updated_at);
        expect(project.applicants).toBe(project_mock[1].applicants);
        expect(project.accepted).toBe(project_mock[1].accepted);
    });

    it("should not create a project without id", async () => {
        const project_mock = new ProjectMock().projects;
        var project = project_mock[1];
        project.id = null;

        expect(async () => {
            new Project(project);
        }).rejects.toThrow("EntityError: Parameter id is required");
    });

    it("should not create a project without title", async () => {
        const project_mock = new ProjectMock().projects;
        var project = project_mock[1];
        project.title = '';

        expect(async () => {
            new Project(project);
        }).rejects.toThrow("EntityError: Parameter title is required");
    });

    it("should not create a project without start_date", async () => {
        const project_mock = new ProjectMock().projects;
        var project = project_mock[1];
        project.start_date = null;

        expect(async () => {
            new Project(project);
        }).rejects.toThrowError("EntityError: Parameter start_date is required");
    });

    it("should not create a project without end_date", async () => {
        const project_mock = new ProjectMock().projects;
        var project = project_mock[1];
        project.end_date = null;

        expect(async () => {
            new Project(project);
        }).rejects.toThrowError("EntityError: Parameter end_date is required");
    });

    it("should not create a project without description", async () => {
        const project_mock = new ProjectMock().projects;
        var project = project_mock[1];
        project.description = '';

        expect(async () => {
            new Project(project);
        }).rejects.toThrowError("EntityError: Parameter description is required");
    });

    it("should not create a project without status_project", async () => {
        const project_mock = new ProjectMock().projects;
        var project = project_mock[1];
        project.status_project = null;

        expect(async () => {
            new Project(project);
        }).rejects.toThrowError(EntityError);
    });

    it("should not create a project without created_at", async () => {
        const project_mock = new ProjectMock().projects;
        var project = project_mock[1];
        project.created_at = null;

        expect(async () => {
            new Project(project);
        }).rejects.toThrowError(EntityError);
    });
    
    it("should not create a project without updated_at", async () => {
        const project_mock = new ProjectMock().projects;
        var project = project_mock[1];
        project.updated_at = null;

        expect(async () => {
            new Project(project);
        }).rejects.toThrowError(EntityError);
    });
});