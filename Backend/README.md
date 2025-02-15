# Colab Cafe Backend

A robust Node.js backend for the Colab Cafe project collaboration platform.

## Features

- 🔐 JWT-based Authentication
- 👥 User Management & Social Features
- 📁 Project Management
- 💬 Real-time Comments & Notifications
- 🔒 Role-Based Access Control
- 📊 PostgreSQL Database with Sequelize ORM
- 🚀 Production-Ready Configuration

## Prerequisites

- Node.js >= 18
- PostgreSQL >= 14
- npm or yarn

## Getting Started

1. Clone the repository
2. Copy `.env.example` to `.env` and update the values
3. Install dependencies:
```bash
npm install
```

4. Run database migrations:
```bash
npm run migrate
```

5. Start the development server:
```bash
npm run dev
```

## Environment Variables

Required environment variables:
- `NODE_ENV` - development/production/test
- `PORT` - Server port (default: 5000)
- `DB_HOST` - Database host
- `DB_PORT` - Database port
- `DB_NAME` - Database name
- `DB_USER` - Database user
- `DB_PASSWORD` - Database password
- `JWT_SECRET` - JWT signing secret
- `FRONTEND_URL` - Frontend application URL for CORS

## API Documentation

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - User login
- POST `/api/auth/logout` - User logout
- GET `/api/auth/me` - Get current user

### Users
- GET `/api/users` - Search users
- GET `/api/users/:id` - Get user profile
- PUT `/api/users/:id` - Update user profile
- POST `/api/users/:id/follow` - Follow/unfollow user

### Projects
- GET `/api/projects` - List projects
- POST `/api/projects` - Create project
- GET `/api/projects/:id` - Get project details
- PUT `/api/projects/:id` - Update project
- DELETE `/api/projects/:id` - Delete project

### Comments
- GET `/api/comments/project/:projectId` - Get project comments
- POST `/api/comments/project/:projectId` - Create comment
- PUT `/api/comments/:id` - Update comment
- DELETE `/api/comments/:id` - Delete comment

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run migrate` - Run database migrations
- `npm run migrate:undo` - Undo last migration
- `npm run seed` - Run database seeders

## Docker

Build and run with Docker Compose:
```bash
docker-compose up --build
```

## Security Features

- JWT Authentication
- Password Hashing (bcrypt)
- Rate Limiting
- CORS Protection
- XSS Prevention
- SQL Injection Protection
- Security Headers (Helmet)
- Request Validation
- Input Sanitization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License