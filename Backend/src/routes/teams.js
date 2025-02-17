const express = require('express');
const router = express.Router();
const teamService = require('../services/teamService');
const auth = require('../middlewares/auth');
const { validate } = require('../middlewares/validation');
const { body } = require('express-validator');
const { ApiError } = require('../utils/ApiError');

// Validation middleware
const teamValidation = {
    create: [
        body('name').trim().notEmpty().withMessage('Team name is required'),
        body('description').trim().notEmpty().withMessage('Team description is required')
    ],
    update: [
        body('name').optional().trim().notEmpty().withMessage('Team name cannot be empty'),
        body('description').optional().trim().notEmpty().withMessage('Team description cannot be empty')
    ]
};

// Create a new team
router.post('/',
    auth,
    teamValidation.create,
    validate,
    async (req, res, next) => {
        try {
            const team = await teamService.createTeam(req.body, req.user.id);
            res.status(201).json(team);
        } catch (error) {
            next(error);
        }
    }
);

// Get team by ID
router.get('/:id',
    auth,
    async (req, res, next) => {
        try {
            const team = await teamService.getTeamById(req.params.id);
            res.json(team);
        } catch (error) {
            next(error);
        }
    }
);

// Update team
router.put('/:id',
    auth,
    teamValidation.update,
    validate,
    async (req, res, next) => {
        try {
            const team = await teamService.updateTeam(req.params.id, req.body, req.user.id);
            res.json(team);
        } catch (error) {
            next(error);
        }
    }
);

// Delete team
router.delete('/:id',
    auth,
    async (req, res, next) => {
        try {
            await teamService.deleteTeam(req.params.id, req.user.id);
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    }
);

// Add team member
router.post('/:id/members',
    auth,
    body('userId').notEmpty().withMessage('User ID is required'),
    body('role').optional().isIn(['member', 'admin']).withMessage('Invalid role'),
    validate,
    async (req, res, next) => {
        try {
            const member = await teamService.addTeamMember(
                req.params.id,
                req.body.userId,
                req.body.role
            );
            res.status(201).json(member);
        } catch (error) {
            next(error);
        }
    }
);

// Remove team member
router.delete('/:id/members/:memberId',
    auth,
    async (req, res, next) => {
        try {
            await teamService.removeTeamMember(
                req.params.id,
                req.params.memberId,
                req.user.id
            );
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    }
);

// Update team member role
router.put('/:id/members/:memberId',
    auth,
    body('role').isIn(['member', 'admin']).withMessage('Invalid role'),
    validate,
    async (req, res, next) => {
        try {
            const member = await teamService.updateTeamMemberRole(
                req.params.id,
                req.params.memberId,
                req.body.role,
                req.user.id
            );
            res.json(member);
        } catch (error) {
            next(error);
        }
    }
);

// Get user's teams
router.get('/user/teams',
    auth,
    async (req, res, next) => {
        try {
            if (!req.user || !req.user.id) {
                throw new ApiError(401, 'User not authenticated');
            }
            const teams = await teamService.getUserTeams(req.user.id);
            res.json(teams);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router; 