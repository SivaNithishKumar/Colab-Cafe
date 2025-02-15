const router = require('express').Router();
const ProjectService = require('../services/projectService');
const { auth } = require('../middlewares/auth');
const { NotFoundError } = require('../utils/errors');

// Get all projects (public)
router.get('/', auth, async (req, res, next) => {
    try {
        const projects = await ProjectService.getProjects(req.query);
        res.json(projects);
    } catch (error) {
        next(error);
    }
});

// Create new project
router.post('/', auth, async (req, res, next) => {
    try {
        const project = await ProjectService.createProject(req.body, req.user.id);
        res.status(201).json(project);
    } catch (error) {
        next(error);
    }
});

// Get project by ID
router.get('/:id', auth, async (req, res, next) => {
    try {
        const project = await ProjectService.getProjectById(req.params.id);
        if (!project) {
            throw new NotFoundError('Project not found');
        }
        res.json(project);
    } catch (error) {
        next(error);
    }
});

// Update project
router.put('/:id', auth, async (req, res, next) => {
    try {
        const project = await ProjectService.updateProject(req.params.id, req.body, req.user.id);
        res.json(project);
    } catch (error) {
        next(error);
    }
});

// Delete project
router.delete('/:id', auth, async (req, res, next) => {
    try {
        await ProjectService.deleteProject(req.params.id, req.user.id);
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;