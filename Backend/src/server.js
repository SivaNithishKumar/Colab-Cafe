const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { initializeDatabase, sequelize } = require('./config/database');
const errorHandler = require('./middlewares/error');
const securityMiddleware = require('./middlewares/security');
const { apiLimiter } = require('./middlewares/rateLimiter');
require('dotenv').config();

// Initialize express app
const app = express();
const httpServer = createServer(app);

// Initialize Socket.IO
const io = new Server(httpServer, {
    cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:3001',
        methods: ['GET', 'POST']
    }
});

// Middleware
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3001',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(morgan('combined'));
app.use(apiLimiter);
app.use(securityMiddleware);

// Create uploads directory if it doesn't exist
const fs = require('fs');
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// Start server
const PORT = process.env.PORT || 3000;
const startServer = async () => {
    try {
        // Initialize database and models
        await initializeDatabase();

        // Note: Removed force:true as it's dangerous in production
        // Use alter:true for development or remove sync altogether if using migrations
        await sequelize.sync({ alter: true });

        // Initialize routes after database is ready
        app.use('/api/auth', require('./routes/auth'));
        app.use('/api/users', require('./routes/users'));
        app.use('/api/projects', require('./routes/projects'));
        app.use('/api/comments', require('./routes/comments'));
        app.use('/api/upload', require('./routes/upload'));
        app.use('/api/teams', require('./routes/teams'));

        // Error handling - must be last
        app.use(errorHandler);

        // Socket.IO connection handling
        io.on('connection', (socket) => {
            console.log('Client connected:', socket.id);
            require('./sockets')(socket, io);
        });

        // Start HTTP server
        httpServer.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
    console.error('Unhandled Rejection:', error);
    process.exit(1);
});

startServer();