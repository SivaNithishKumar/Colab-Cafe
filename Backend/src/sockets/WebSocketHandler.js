const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

class WebSocketHandler {
    constructor(server) {
        this.io = new Server(server, {
            cors: {
                origin: process.env.FRONTEND_URL,
                methods: ['GET', 'POST']
            }
        });

        this.io.use(this.authenticateSocket);
        this.setupEventHandlers();
    }

    authenticateSocket = async (socket, next) => {
        try {
            const token = socket.handshake.auth.token;
            if (!token) {
                throw new Error('Authentication error');
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            socket.userId = decoded.id;
            socket.user = decoded;
            next();
        } catch (error) {
            next(new Error('Authentication error'));
        }
    };

    setupEventHandlers() {
        this.io.on('connection', (socket) => {
            logger.info(`User connected: ${socket.userId}`);

            // Join user's personal room
            socket.join(`user:${socket.userId}`);

            // Handle project room subscription
            socket.on('join:project', (projectId) => {
                socket.join(`project:${projectId}`);
                logger.info(`User ${socket.userId} joined project ${projectId}`);
            });

            // Handle project room unsubscription
            socket.on('leave:project', (projectId) => {
                socket.leave(`project:${projectId}`);
                logger.info(`User ${socket.userId} left project ${projectId}`);
            });

            // Handle disconnection
            socket.on('disconnect', () => {
                logger.info(`User disconnected: ${socket.userId}`);
            });
        });
    }

    // Utility methods for emitting events
    notifyUser(userId, event, data) {
        this.io.to(`user:${userId}`).emit(event, data);
    }

    notifyProject(projectId, event, data) {
        this.io.to(`project:${projectId}`).emit(event, data);
    }

    broadcastProjectUpdate(projectId, data) {
        this.io.to(`project:${projectId}`).emit('project:update', data);
    }

    notifyNewComment(projectId, comment) {
        this.io.to(`project:${projectId}`).emit('comment:new', comment);
    }
}

module.exports = WebSocketHandler;