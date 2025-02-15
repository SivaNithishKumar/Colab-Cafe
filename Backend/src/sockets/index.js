const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = (socket, io) => {
    // Authenticate socket connection
    socket.on('authenticate', async (token) => {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findByPk(decoded.id);
            if (user) {
                socket.userId = user.id;
                socket.join(`user:${user.id}`);
                socket.emit('authenticated');
            }
        } catch (error) {
            socket.emit('auth_error', { message: 'Authentication failed' });
        }
    });

    // Handle project updates
    socket.on('join_project', (projectId) => {
        socket.join(`project:${projectId}`);
    });

    socket.on('leave_project', (projectId) => {
        socket.leave(`project:${projectId}`);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
};