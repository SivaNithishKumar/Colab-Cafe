const { Team, User, TeamMember, Project } = require('../models');
const { ApiError } = require('../utils/ApiError');

class TeamService {
    async createTeam(teamData, leaderId) {
        try {
            const team = await Team.create({ ...teamData, leaderId });
            await TeamMember.create({
                teamId: team.id,
                userId: leaderId,
                role: 'leader'
            });
            return team;
        } catch (error) {
            console.error('Error in createTeam:', error);
            throw new ApiError(500, 'Failed to create team');
        }
    }

    async getTeamById(teamId) {
        try {
            const team = await Team.findByPk(teamId, {
                include: [
                    {
                        model: User,
                        as: 'leader',
                        attributes: ['id', 'username', 'avatar']
                    },
                    {
                        model: User,
                        as: 'members',
                        attributes: ['id', 'username', 'avatar'],
                        through: { attributes: ['role', 'joinedAt'] }
                    },
                    {
                        model: Project,
                        as: 'projects',
                        attributes: ['id', 'title', 'description', 'thumbnail', 'technologies', 'createdAt']
                    }
                ]
            });

            if (!team) {
                throw new ApiError(404, 'Team not found');
            }

            return team;
        } catch (error) {
            console.error('Error in getTeamById:', error);
            if (error instanceof ApiError) throw error;
            throw new ApiError(500, 'Failed to fetch team details');
        }
    }

    async getUserTeams(userId) {
        try {
            if (!userId) {
                throw new ApiError(400, 'User ID is required');
            }

            // Fetch team memberships including the associated team using the alias 'team'
            const memberships = await TeamMember.findAll({
                where: { userId },
                include: [{
                    model: Team,
                    as: 'team',
                    include: [
                        { model: User, as: 'leader', attributes: ['id', 'username', 'avatar'] },
                        { model: User, as: 'members', attributes: ['id', 'username', 'avatar'], through: { attributes: ['role'] } },
                        { model: Project, as: 'projects', attributes: ['id', 'title'], required: false }
                    ]
                }]
            });

            // Map memberships to get the team instance
            const teams = memberships.map(membership => membership.team);

            return teams.map(team => {
                const teamData = team.get({ plain: true });
                return {
                    ...teamData,
                    stats: {
                        memberCount: teamData.members ? teamData.members.length : 0,
                        projectCount: teamData.projects ? teamData.projects.length : 0
                    }
                };
            });
        } catch (error) {
            console.error('Error in getUserTeams:', error);
            if (error instanceof ApiError) throw error;
            throw new ApiError(500, 'Failed to fetch user teams');
        }
    }

    async updateTeam(teamId, updateData, userId) {
        try {
            const team = await Team.findByPk(teamId);
            if (!team) {
                throw new ApiError(404, 'Team not found');
            }
            if (team.leaderId !== userId) {
                throw new ApiError(403, 'Only team leader can update team details');
            }

            await team.update(updateData);
            return team;
        } catch (error) {
            console.error('Error in updateTeam:', error);
            if (error instanceof ApiError) throw error;
            throw new ApiError(500, 'Failed to update team');
        }
    }

    async deleteTeam(teamId, userId) {
        try {
            const team = await Team.findByPk(teamId);
            if (!team) {
                throw new ApiError(404, 'Team not found');
            }
            if (team.leaderId !== userId) {
                throw new ApiError(403, 'Only team leader can delete the team');
            }

            await team.destroy();
        } catch (error) {
            console.error('Error in deleteTeam:', error);
            if (error instanceof ApiError) throw error;
            throw new ApiError(500, 'Failed to delete team');
        }
    }

    async addTeamMember(teamId, userId, role = 'member') {
        try {
            const team = await Team.findByPk(teamId);
            if (!team) {
                throw new ApiError(404, 'Team not found');
            }

            const existingMember = await TeamMember.findOne({ where: { teamId, userId } });
            if (existingMember) {
                throw new ApiError(400, 'User is already a member of this team');
            }

            return await TeamMember.create({
                teamId,
                userId,
                role
            });
        } catch (error) {
            console.error('Error in addTeamMember:', error);
            if (error instanceof ApiError) throw error;
            throw new ApiError(500, 'Failed to add team member');
        }
    }

    async removeTeamMember(teamId, memberId, requesterId) {
        try {
            const team = await Team.findByPk(teamId);
            if (!team) {
                throw new ApiError(404, 'Team not found');
            }
            if (team.leaderId !== requesterId) {
                throw new ApiError(403, 'Only team leader can remove members');
            }
            if (memberId === team.leaderId) {
                throw new ApiError(400, 'Team leader cannot be removed');
            }

            const teamMember = await TeamMember.findOne({ where: { teamId, userId: memberId } });
            if (!teamMember) {
                throw new ApiError(404, 'Team member not found');
            }

            await teamMember.destroy();
        } catch (error) {
            console.error('Error in removeTeamMember:', error);
            if (error instanceof ApiError) throw error;
            throw new ApiError(500, 'Failed to remove team member');
        }
    }

    async updateTeamMemberRole(teamId, memberId, newRole, requesterId) {
        try {
            const team = await Team.findByPk(teamId);
            if (!team) {
                throw new ApiError(404, 'Team not found');
            }
            if (team.leaderId !== requesterId) {
                throw new ApiError(403, 'Only team leader can update member roles');
            }

            const teamMember = await TeamMember.findOne({ where: { teamId, userId: memberId } });
            if (!teamMember) {
                throw new ApiError(404, 'Team member not found');
            }

            await teamMember.update({ role: newRole });
            return teamMember;
        } catch (error) {
            console.error('Error in updateTeamMemberRole:', error);
            if (error instanceof ApiError) throw error;
            throw new ApiError(500, 'Failed to update team member role');
        }
    }
}

module.exports = new TeamService(); 