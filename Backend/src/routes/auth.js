const router = require('express').Router();
const AuthService = require('../services/authService');
const { auth } = require('../middlewares/auth');

router.post('/register', async (req, res, next) => {
    try {
        const { user, token } = await AuthService.register(req.body);
        res.status(201).json({ user, token });
    } catch (error) {
        next(error);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const { user, token } = await AuthService.login(email, password);
        res.json({ user, token });
    } catch (error) {
        console.error('Login error:', error);
        if (error.message === 'Invalid credentials') {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        res.status(500).json({ error: 'An error occurred during login. Please try again.' });
    }
});

router.post('/logout', auth, (req, res) => {
    res.json({ message: 'Logged out successfully' });
});

router.get('/me', auth, (req, res) => {
    res.json(req.user);
});

module.exports = router;