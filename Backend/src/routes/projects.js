const express = require('express');
const router = express.Router();
const projectService = require('../services/projectService');
const auth = require('../middlewares/auth');
const { validate } = require('../middlewares/validation');
const { body } = require('express-validator');

// Validation middleware
const projectValidation = {
    create: [
        body('title').trim().notEmpty().withMessage('Title is required'),
        body('description').trim().notEmpty().withMessage('Description is required'),
        body('category').trim().notEmpty().withMessage('Category is required'),
        body('isTeamProject').optional().isBoolean().withMessage('isTeamProject must be a boolean'),
        body('teamId').optional().isUUID().withMessage('Invalid team ID')
    ],
    update: [
        body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
        body('description').optional().trim().notEmpty().withMessage('Description cannot be empty'),
        body('category').optional().trim().notEmpty().withMessage('Category cannot be empty'),
        body('isTeamProject').optional().isBoolean().withMessage('isTeamProject must be a boolean'),
        body('teamId').optional().isUUID().withMessage('Invalid team ID')
    ]
};

// Get all projects (public)
router.get('/', async (req, res, next) => {
    try {
        const projects = await projectService.getProjects(req.query);
        res.json({ projects });
    } catch (error) {
        next(error);
    }
});

// Create new project
router.post('/', [
    auth,
    ...projectValidation.create,
    validate
], async (req, res, next) => {
    try {
        const project = await projectService.createProject(req.body, req.user.id);
        res.status(201).json(project);
    } catch (error) {
        next(error);
    }
});

// Get project by ID
router.get('/:id', async (req, res, next) => {
    try {
        const project = await projectService.getProjectById(req.params.id);
        res.json(project);
    } catch (error) {
        next(error);
    }
});

// Update project
router.put('/:id', [
    auth,
    ...projectValidation.update,
    validate
], async (req, res, next) => {
    try {
        const project = await projectService.updateProject(req.params.id, req.body, req.user.id);
        res.json(project);
    } catch (error) {
        next(error);
    }
});

// Delete project
router.delete('/:id', [
    auth
], async (req, res, next) => {
    try {
        await projectService.deleteProject(req.params.id, req.user.id);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

module.exports = router;