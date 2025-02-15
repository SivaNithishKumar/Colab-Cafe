const router = require('express').Router();
const UserService = require('../services/userService');
const { auth } = require('../middlewares/auth');
const { User, Project } = require('../models');

// Get user profile
router.get('/:username', async (req, res) => {
    try {
        console.log('Fetching profile for username:', req.params.username);

        const user = await User.findOne({
            where: { username: req.params.username },
            attributes: {
                exclude: ['password'],
                include: ['id', 'username', 'email', 'avatar', 'bio', 'title', 'skills', 'socialLinks', 'stats', 'achievements']
            },
            include: [{
                model: Project,
                as: 'projects',
                attributes: ['id', 'title', 'description', 'thumbnail', 'tags', 'likes', 'commentsCount', 'createdAt'],
                required: false // Make this a LEFT JOIN
            }]
        });

        if (!user) {
            console.log('User not found:', req.params.username);
            return res.status(404).json({ error: 'User not found' });
        }

        // Ensure all JSON fields are properly parsed and handle missing project data
        const userData = {
            ...user.toJSON(),
            skills: typeof user.skills === 'string' ? JSON.parse(user.skills) : user.skills || [],
            socialLinks: typeof user.socialLinks === 'string' ? JSON.parse(user.socialLinks) : user.socialLinks || {},
            achievements: typeof user.achievements === 'string' ? JSON.parse(user.achievements) : user.achievements || [],
            stats: typeof user.stats === 'string' ? JSON.parse(user.stats) : user.stats || {
                projectsCount: 0,
                collaborationsCount: 0,
                contributionsCount: 0,
                viewsCount: 0
            },
            projects: (user.projects || []).map(project => ({
                ...project,
                thumbnail: project.thumbnail || null,
                tags: typeof project.tags === 'string' ? JSON.parse(project.tags) : project.tags || [],
                likes: project.likes || 0,
                commentsCount: project.commentsCount || 0
            }))
        };

        console.log('Successfully fetched user profile');
        res.json(userData);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({
            error: 'Failed to fetch user profile',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
    try {
        const allowedUpdates = [
            'bio', 'title', 'skills', 'socialLinks',
            'avatar', 'username'
        ];

        const updates = {};
        Object.keys(req.body).forEach(key => {
            if (allowedUpdates.includes(key)) {
                updates[key] = req.body[key];
            }
        });

        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await user.update(updates);

        const updatedUser = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] },
            include: [{
                model: Project,
                as: 'projects',
                attributes: ['id', 'title', 'description', 'thumbnail', 'tags', 'likes', 'commentsCount', 'createdAt']
            }]
        });

        const userData = {
            ...updatedUser.toJSON(),
            skills: typeof updatedUser.skills === 'string' ? JSON.parse(updatedUser.skills) : updatedUser.skills || [],
            socialLinks: typeof updatedUser.socialLinks === 'string' ? JSON.parse(updatedUser.socialLinks) : updatedUser.socialLinks || {},
            achievements: typeof updatedUser.achievements === 'string' ? JSON.parse(updatedUser.achievements) : updatedUser.achievements || [],
            stats: typeof updatedUser.stats === 'string' ? JSON.parse(updatedUser.stats) : updatedUser.stats || {
                projectsCount: 0,
                collaborationsCount: 0,
                contributionsCount: 0,
                viewsCount: 0
            }
        };

        res.json(userData);
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(400).json({
            error: 'Failed to update profile',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Get user stats
router.get('/:username/stats', async (req, res) => {
    try {
        const user = await User.findOne({
            where: { username: req.params.username },
            attributes: ['stats']
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user.stats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get user achievements
router.get('/:username/achievements', async (req, res) => {
    try {
        const user = await User.findOne({
            where: { username: req.params.username },
            attributes: ['achievements']
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user.achievements);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Follow/unfollow user
router.post('/:id/follow', auth, async (req, res, next) => {
    try {
        const result = await UserService.toggleFollowUser(req.user.id, req.params.id);
        res.json(result);
    } catch (error) {
        next(error);
    }
});

// Search users
router.get('/', auth, async (req, res, next) => {
    try {
        const users = await UserService.searchUsers(req.query.search);
        res.json(users);
    } catch (error) {
        next(error);
    }
});

module.exports = router;