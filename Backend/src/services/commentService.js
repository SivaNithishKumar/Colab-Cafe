const { Comment, User, Project } = require('../models');
const { NotFoundError, AuthorizationError } = require('../utils/errors');

class CommentService {
    static async createComment(projectId, userId, data) {
        // Check if project exists first
        const project = await Project.findByPk(projectId);
        if (!project) {
            throw new NotFoundError('Project not found');
        }

        return await Comment.create({
            content: data.content,
            projectId,
            userId
        });
    }

    static async getProjectComments(projectId, query = {}) {
        // Verify project exists
        const project = await Project.findByPk(projectId);
        if (!project) {
            throw new NotFoundError('Project not found');
        }

        const { page = 1, limit = 10 } = query;
        const offset = (page - 1) * limit;

        const { rows: comments, count } = await Comment.findAndCountAll({
            where: { projectId },
            include: [{
                model: User,
                attributes: ['id', 'username', 'avatar']
            }],
            limit,
            offset,
            order: [['createdAt', 'DESC']]
        });

        return {
            comments,
            pagination: {
                total: count,
                page: parseInt(page),
                totalPages: Math.ceil(count / limit)
            }
        };
    }

    static async updateComment(commentId, userId, content) {
        const comment = await Comment.findByPk(commentId);
        
        if (!comment) {
            throw new NotFoundError('Comment not found');
        }
        
        if (comment.userId !== userId) {
            throw new AuthorizationError('Not authorized to update this comment');
        }

        await comment.update({ content });
        return comment;
    }

    static async deleteComment(commentId, userId) {
        const comment = await Comment.findByPk(commentId);
        
        if (!comment) {
            throw new NotFoundError('Comment not found');
        }
        
        if (comment.userId !== userId) {
            throw new AuthorizationError('Not authorized to delete this comment');
        }

        await comment.destroy();
        return true;
    }
}

module.exports = CommentService;