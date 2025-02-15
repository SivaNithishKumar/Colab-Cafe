const router = require('express').Router();
const CommentService = require('../services/commentService');
const { auth } = require('../middlewares/auth');
const { NotFoundError } = require('../utils/errors');

// Get project comments
router.get('/project/:projectId', auth, async (req, res, next) => {
    try {
        const comments = await CommentService.getProjectComments(req.params.projectId, req.query);
        res.json(comments);
    } catch (error) {
        next(error);
    }
});

// Create comment
router.post('/', auth, async (req, res, next) => {
    try {
        const { projectId, content } = req.body;
        const comment = await CommentService.createComment(projectId, req.user.id, { content });
        res.status(201).json(comment);
    } catch (error) {
        next(error);
    }
});

// Update comment
router.put('/:id', auth, async (req, res, next) => {
    try {
        const comment = await CommentService.updateComment(req.params.id, req.user.id, req.body.content);
        if (!comment) {
            throw new NotFoundError('Comment not found');
        }
        res.json(comment);
    } catch (error) {
        next(error);
    }
});

// Delete comment
router.delete('/:id', auth, async (req, res, next) => {
    try {
        await CommentService.deleteComment(req.params.id, req.user.id);
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;