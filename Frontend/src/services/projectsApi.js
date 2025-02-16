import api from './api';

export const projectsApi = {
    // Get all projects with optional filters
    getProjects: async (filters = {}) => {
        try {
            const response = await api.get('/api/projects', { params: filters });
            return {
                projects: response.data.projects || response.data || [],
                pagination: response.data.pagination
            };
        } catch (error) {
            console.error('Error fetching projects:', error);
            throw error;
        }
    },

    // Get a single project by ID
    getProject: async (id) => {
        try {
            const response = await api.get(`/api/projects/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching project:', error);
            throw error;
        }
    },

    // Create a new project
    createProject: async (projectData) => {
        try {
            // Handle file upload first if there's a thumbnail
            let thumbnailUrl = null;
            if (projectData.thumbnail instanceof File) {
                const formData = new FormData();
                formData.append('file', projectData.thumbnail);
                const uploadResponse = await api.post('/api/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                thumbnailUrl = uploadResponse.data.url;
            }

            // Ensure technologies is an array
            const technologies = Array.isArray(projectData.technologies)
                ? projectData.technologies
                : (typeof projectData.technologies === 'object'
                    ? Object.values(projectData.technologies).flat().filter(Boolean)
                    : []);

            // Prepare the project payload
            const projectPayload = {
                ...projectData,
                thumbnail: thumbnailUrl || projectData.thumbnail,
                technologies: technologies,
                // Ensure all text fields are strings
                description: String(projectData.description || ''),
                shortDescription: String(projectData.shortDescription || ''),
                architecture: String(projectData.architecture || ''),
                technicalImplementation: String(projectData.technicalImplementation || ''),
                performanceOptimizations: String(projectData.performanceOptimizations || ''),
                developmentApproach: String(projectData.developmentApproach || ''),
                challengesFaced: String(projectData.challengesFaced || ''),
                futurePlans: String(projectData.futurePlans || ''),
                // Ensure arrays are properly formatted
                keyFeatures: Array.isArray(projectData.keyFeatures) ? projectData.keyFeatures : []
            };

            // Create project
            const response = await api.post('/api/projects', projectPayload);
            return response.data;
        } catch (error) {
            console.error('Project creation error:', error);
            throw error;
        }
    },

    // Update an existing project
    updateProject: async (id, projectData) => {
        try {
            const response = await api.put(`/api/projects/${id}`, projectData);
            return response.data;
        } catch (error) {
            console.error('Error updating project:', error);
            throw error;
        }
    },

    // Delete a project
    deleteProject: async (id) => {
        try {
            const response = await api.delete(`/api/projects/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting project:', error);
            throw error;
        }
    }
}; 