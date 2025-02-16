import api from './api';

export const teamsApi = {
    async createTeam(teamData) {
        const response = await api.post('/teams', teamData);
        return response.data;
    },

    async getTeamById(teamId) {
        const response = await api.get(`/teams/${teamId}`);
        return response.data;
    },

    async getUserTeams() {
        const response = await api.get('/teams/user/teams');
        return response.data;
    },

    async updateTeam(teamId, updateData) {
        const response = await api.put(`/teams/${teamId}`, updateData);
        return response.data;
    },

    async deleteTeam(teamId) {
        await api.delete(`/teams/${teamId}`);
    },

    async addTeamMember(teamId, userId, role = 'member') {
        const response = await api.post(`/teams/${teamId}/members`, { userId, role });
        return response.data;
    },

    async removeTeamMember(teamId, memberId) {
        await api.delete(`/teams/${teamId}/members/${memberId}`);
    },

    async updateTeamMemberRole(teamId, memberId, role) {
        const response = await api.put(`/teams/${teamId}/members/${memberId}`, { role });
        return response.data;
    }
}; 