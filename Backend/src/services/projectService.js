const { Project, User, Team, TeamMember } = require('../models');
const { NotFoundError, AuthorizationError } = require('../utils/errors');
const ApiError = require('../utils/ApiError');

class ProjectService {
    async createProject(projectData, userId) {
        // If it's a team project, verify user is a team member
        if (projectData.isTeamProject && projectData.teamId) {
            const teamMember = await TeamMember.findOne({
                where: { teamId: projectData.teamId, userId }
            });

            if (!teamMember) {
                throw new ApiError(403, 'You must be a team member to create a team project');
            }
        }

        const project = await Project.create({
            ...projectData,
            userId
        });

        return project;
    }

    async getProjects(filters = {}) {
        const where = {};
        const include = [
            {
                model: User,
                attributes: ['id', 'username', 'avatar']
            },
            {
                model: Team,
                attributes: ['id', 'name', 'avatar']
            }
        ];

        if (filters.userId) {
            where.userId = filters.userId;
        }

        if (filters.teamId) {
            where.teamId = filters.teamId;
        }

        if (filters.category) {
            where.category = filters.category;
        }

        if (filters.status) {
            where.status = filters.status;
        }

        return await Project.findAll({
            where,
            include,
            order: [['createdAt', 'DESC']]
        });
    }

    async getProjectById(projectId) {
        const project = await Project.findByPk(projectId, {
            include: [
                {
                    model: User,
                    attributes: ['id', 'username', 'avatar']
                },
                {
                    model: Team,
                    attributes: ['id', 'name', 'avatar'],
                    include: [{
                        model: User,
                        as: 'leader',
                        attributes: ['id', 'username']
                    }]
                }
            ]
        });

        if (!project) {
            throw new ApiError(404, 'Project not found');
        }

        return project;
    }

    async updateProject(projectId, updateData, userId) {
        const project = await Project.findByPk(projectId, {
            include: [{ model: Team }]
        });

        if (!project) {
            throw new ApiError(404, 'Project not found');
        }

        // Check if user has permission to update
        if (project.isTeamProject && project.Team) {
            const teamMember = await TeamMember.findOne({
                where: { teamId: project.Team.id, userId }
            });

            if (!teamMember || (teamMember.role !== 'leader' && teamMember.role !== 'admin')) {
                throw new ApiError(403, 'Only team leaders and admins can update team projects');
            }
        } else if (project.userId !== userId) {
            throw new ApiError(403, 'You do not have permission to update this project');
        }

        await project.update(updateData);
        return project;
    }

    async deleteProject(projectId, userId) {
        const project = await Project.findByPk(projectId, {
            include: [{ model: Team }]
        });

        if (!project) {
            throw new ApiError(404, 'Project not found');
        }

        // Check if user has permission to delete
        if (project.isTeamProject && project.Team) {
            const teamMember = await TeamMember.findOne({
                where: { teamId: project.Team.id, userId }
            });

            if (!teamMember || teamMember.role !== 'leader') {
                throw new ApiError(403, 'Only team leaders can delete team projects');
            }
        } else if (project.userId !== userId) {
            throw new ApiError(403, 'You do not have permission to delete this project');
        }

        await project.destroy();
    }
}

module.exports = new ProjectService();