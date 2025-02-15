# API Testing Commands

## Health Check
```bash
curl http://localhost:3000/health
```

## Authentication Endpoints

### Register a new user
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## User Endpoints
Note: Replace {token} with the actual JWT token received from login

### Get User Profile
```bash
curl http://localhost:3000/api/users/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZkMTI4MmE3LTA1MzItNDIwZi05OTJhLWU2NDc2MWZkNzliMCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzM5NjAwNTgxLCJleHAiOjE3Mzk2ODY5ODF9.InZNogTdI5TIfuC6-RxA_4fE8I9xAt3K-kL3vRcs7hw"
```

### Update User Profile
```bash
curl -X PUT http://localhost:3000/api/users/profile \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "updatedusername",
    "bio": "This is my bio"
  }'
```

## Project Endpoints

### Create Project
```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Project",
    "description": "This is a test project",
    "status": "active"
  }'
```

### Get All Projects
```bash
curl http://localhost:3000/api/projects \
  -H "Authorization: Bearer {token}"
```

### Get Project by ID
```bash
curl http://localhost:3000/api/projects/{projectId} \
  -H "Authorization: Bearer {token}"
```

### Update Project
```bash
curl -X PUT http://localhost:3000/api/projects/{projectId} \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Project",
    "description": "This is an updated project",
    "status": "completed"
  }'
```

### Delete Project
```bash
curl -X DELETE http://localhost:3000/api/projects/{projectId} \
  -H "Authorization: Bearer {token}"
```

## Comment Endpoints

### Create Comment
```bash
curl -X POST http://localhost:3000/api/comments \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "projectId": "{projectId}",
    "content": "This is a test comment"
  }'
```

### Get Comments for Project
```bash
curl http://localhost:3000/api/comments/project/{projectId} \
  -H "Authorization: Bearer {token}"
```

### Update Comment
```bash
curl -X PUT http://localhost:3000/api/comments/{commentId} \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "This is an updated comment"
  }'
```

### Delete Comment
```bash
curl -X DELETE http://localhost:3000/api/comments/{commentId} \
  -H "Authorization: Bearer {token}"
```

## Testing Flow

1. Start by testing the health check endpoint
2. Register a new user
3. Login with the registered user and save the token
4. Create a new project
5. Get all projects to verify creation
6. Get the specific project by ID
7. Add a comment to the project
8. Get all comments for the project
9. Update the comment
10. Update the project
11. Delete the comment
12. Delete the project

Replace the following placeholders in the commands:
- {token} with the JWT token received after login
- {projectId} with the actual project ID received after creating a project
- {commentId} with the actual comment ID received after creating a comment
