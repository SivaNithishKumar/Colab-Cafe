const { Project, User } = require('../models');
const { NotFoundError, AuthorizationError } = require('../utils/errors');

class ProjectService {
    static async createProject(projectData, userId) {
        const project = await Project.create({
            ...projectData,
            userId
        });

        return await Project.findByPk(project.id, {
            include: [{ 
                model: User,
                attributes: ['id', 'username', 'avatar']
            }]
        });
    }

    static async getProjects(query = {}) {
        const { page = 1, limit = 10 } = query;
        const offset = (page - 1) * limit;

        const { rows: projects, count } = await Project.findAndCountAll({
            include: [{
                model: User,
                attributes: ['id', 'username', 'avatar']
            }],
            limit: parseInt(limit),
            offset: offset,
            order: [['createdAt', 'DESC']]
        });

        return { 
            projects,
            pagination: {
                total: count,
                page: parseInt(page),
                totalPages: Math.ceil(count / limit)
            }
        };
    }

    static async getProjectById(projectId) {
        const project = await Project.findByPk(projectId, {
            include: [{
                model: User,
                attributes: ['id', 'username', 'avatar']
            }]
        });

        if (!project) {
            throw new NotFoundError('Project not found');
        }

        return project;
    }

    static async updateProject(projectId, updates, userId) {
        const project = await Project.findByPk(projectId);
        
        if (!project) {
            throw new NotFoundError('Project not found');
        }

        if (project.userId !== userId) {
            throw new AuthorizationError('Not authorized to update this project');
        }

        await project.update(updates);
        
        return await Project.findByPk(project.id, {
            include: [{
                model: User,
                attributes: ['id', 'username', 'avatar']
            }]
        });
    }

    static async deleteProject(projectId, userId) {
        const project = await Project.findByPk(projectId);
        
        if (!project) {
            throw new NotFoundError('Project not found');
        }

        if (project.userId !== userId) {
            throw new AuthorizationError('Not authorized to delete this project');
        }

        await project.destroy();
        return true;
    }
}

module.exports = ProjectService;