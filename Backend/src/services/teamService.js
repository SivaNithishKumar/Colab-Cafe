const { Team, User, TeamMember, Project } = require('../models');
const { Op } = require('sequelize');
const ApiError = require('../utils/ApiError');

class TeamService {
    async createTeam(teamData, leaderId) {
        const team = await Team.create({
            ...teamData,
            leaderId
        });

        // Add leader as a team member with leader role
        await TeamMember.create({
            teamId: team.id,
            userId: leaderId,
            role: 'leader'
        });

        return team;
    }

    async getTeamById(teamId) {
        const team = await Team.findByPk(teamId, {
            include: [
                {
                    model: User,
                    as: 'leader',
                    attributes: ['id', 'username', 'avatar']
                },
                {
                    model: User,
                    through: TeamMember,
                    as: 'Users',
                    attributes: ['id', 'username', 'avatar'],
                    include: [{
                        model: TeamMember,
                        attributes: ['role', 'joinedAt']
                    }]
                },
                {
                    model: Project,
                    attributes: ['id', 'title', 'description', 'thumbnail', 'technologies', 'createdAt']
                }
            ]
        });

        if (!team) {
            throw new ApiError(404, 'Team not found');
        }

        return team;
    }

    async updateTeam(teamId, updateData, userId) {
        const team = await Team.findByPk(teamId);

        if (!team) {
            throw new ApiError(404, 'Team not found');
        }

        if (team.leaderId !== userId) {
            throw new ApiError(403, 'Only team leader can update team details');
        }

        await team.update(updateData);
        return team;
    }

    async deleteTeam(teamId, userId) {
        const team = await Team.findByPk(teamId);

        if (!team) {
            throw new ApiError(404, 'Team not found');
        }

        if (team.leaderId !== userId) {
            throw new ApiError(403, 'Only team leader can delete the team');
        }

        await team.destroy();
    }

    async addTeamMember(teamId, userId, role = 'member') {
        const team = await Team.findByPk(teamId);

        if (!team) {
            throw new ApiError(404, 'Team not found');
        }

        const existingMember = await TeamMember.findOne({
            where: { teamId, userId }
        });

        if (existingMember) {
            throw new ApiError(400, 'User is already a member of this team');
        }

        return await TeamMember.create({
            teamId,
            userId,
            role
        });
    }

    async removeTeamMember(teamId, memberId, requesterId) {
        const team = await Team.findByPk(teamId);

        if (!team) {
            throw new ApiError(404, 'Team not found');
        }

        // Only team leader can remove members
        if (team.leaderId !== requesterId) {
            throw new ApiError(403, 'Only team leader can remove members');
        }

        // Prevent removing the leader
        if (memberId === team.leaderId) {
            throw new ApiError(400, 'Cannot remove team leader');
        }

        const deleted = await TeamMember.destroy({
            where: { teamId, userId: memberId }
        });

        if (!deleted) {
            throw new ApiError(404, 'Team member not found');
        }
    }

    async getUserTeams(userId) {
        return await Team.findAll({
            include: [
                {
                    model: User,
                    as: 'leader',
                    attributes: ['id', 'username', 'avatar']
                }
            ],
            where: {
                [Op.or]: [
                    { leaderId: userId },
                    {
                        '$Users.id$': userId
                    }
                ]
            },
            include: [
                {
                    model: User,
                    as: 'Users',
                    attributes: [],
                    through: { attributes: [] }
                }
            ]
        });
    }

    async updateTeamMemberRole(teamId, memberId, newRole, requesterId) {
        const team = await Team.findByPk(teamId);

        if (!team) {
            throw new ApiError(404, 'Team not found');
        }

        if (team.leaderId !== requesterId) {
            throw new ApiError(403, 'Only team leader can update member roles');
        }

        const teamMember = await TeamMember.findOne({
            where: { teamId, userId: memberId }
        });

        if (!teamMember) {
            throw new ApiError(404, 'Team member not found');
        }

        await teamMember.update({ role: newRole });
        return teamMember;
    }
}

module.exports = new TeamService(); 