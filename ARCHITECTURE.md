# 1. System Overview

This is a full-stack Task Management application built using a three-layer architecture:

* **Frontend (Next.js)** – Handles UI, state management, and API communication.
* **Backend (NestJS)** – Exposes REST APIs, handles authentication, and business logic.
* **Database (MongoDB with Mongoose)** – Stores users and tasks.

### How the layers connect

1. The user interacts with the Next.js frontend.
2. The frontend sends HTTP requests to the NestJS backend.
3. The backend:

   * Validates JWT tokens
   * Processes business logic
   * Reads/writes data from MongoDB
4. The backend returns JSON responses.
5. The frontend updates UI based on API responses.

Authentication is stateless and handled using JWT tokens stored in localStorage and sent in the `Authorization` header.

---

# 2. Folder Structure

## Backend (NestJS)

```
backend/
├── src/
│   ├── auth/
│   │   ├── dto/
│   │   │   ├── login.dto.ts
│   │   │   └── register.dto.ts
│   │   │
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── jwt.strategy.ts
│   │   ├── jwt-auth.guard.ts
│   │   └── auth.module.ts
│   │
│   ├── users/
│   │   ├── users.service.ts
│   │   ├── users.module.ts
│   │   └── schemas/
│   │       └── user.schema.ts
│   │
│   ├── tasks/
│   │   ├── dto/
│   │   │   ├── create-task.dto.ts
│   │   │   └── update-task.dto.ts
│   │   │
│   │   ├── schemas/
│   │   │   └── task.schema.ts
│   │   │
│   │   ├── tasks.controller.ts
│   │   ├── tasks.service.ts
│   │   └── tasks.module.ts
│   │
│   ├── app.module.ts
│   └── main.ts
```

### Why this structure?

* Modular design (Auth, Users, Tasks are isolated)
* Each feature has:

  * Controller (routes)
  * Service (business logic)
  * Schema (database model)
  * Module (dependency wiring)
* This follows NestJS best practices and keeps responsibilities separated.

---

## Frontend (Next.js)

```
frontend/
├── app/
│   ├── dashboard/
│   │   └── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── register/
│   │   └── page.tsx
│   └── layout.tsx
│
├── components/
│   ├── Navbar.tsx
│   ├── ProtectedRoute.tsx
│   ├── TaskForm.tsx
│   ├── TaskItem.tsx
│   └── TaskList.tsx
│
├── context/
│   ├── AuthContext.tsx
│   └── TaskContext.tsx
│
├── styles/
│   └── globals.css
│
├── types/
│   └── task.ts
│
├── utils/
│   └── auth.ts
```

### Why this structure?

* App Router used for route-based separation.
* Context API used for global state:

  * AuthContext → manages login state & token
  * TaskContext → handles task API calls & state
* Separation of UI and logic improves maintainability.

---

# 3. Database Schema

## User Schema

```ts
{
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}
```

### Explanation

* **email**: Unique identifier for authentication.
* **password**: Hashed using bcrypt before storage.
* No plain-text passwords are stored.

---

## Task Schema

```ts
{
  title: {
    type: String,
    required: true
  },
  description: String,
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending"
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium"
  },
  dueDate: Date,
  user: {
    type: ObjectId,
    ref: "User",
    required: true
  }
}
```

### Explanation

* **title**: Main task identifier.
* **description**: Optional detailed info.
* **status**: Controlled using enum to prevent invalid states.
* **priority**: Controlled using enum.
* **dueDate**: Optional deadline.
* **user**: Reference to the owner of the task (ensures multi-user isolation).

Each task belongs to one user.

---

# 4. API Endpoints

## Auth

### Register

```
POST /auth/register
```

Body:

```
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:

```
{
  "access_token": "jwt_token"
}
```

---

### Login

```
POST /auth/login
```

Response:

```
{
  "access_token": "jwt_token"
}
```

---

## Tasks (Protected Routes)

All routes require:

```
Authorization: Bearer <token>
```

---

### Get All Tasks

```
GET /tasks
```

Returns: Array of user’s tasks

---

### Create Task

```
POST /tasks
```

Body:

```
{
  "title": "Task title",
  "description": "...",
  "priority": "high"
}
```

---

### Update Task

```
PATCH /tasks/:id
```

---

### Delete Task

```
DELETE /tasks/:id
```

---

# 5. Auth Flow

End-to-end JWT flow:

1. User registers → password is hashed using bcrypt.
2. Backend generates JWT containing:

   ```
   { email }
   ```
3. Token returned to frontend.
4. Frontend stores token in localStorage.
5. For protected routes:

   * Token sent in Authorization header.
6. JwtStrategy validates token.
7. If valid:

   * Request proceeds
   * User’s tasks are filtered by user ID
8. If invalid:

   * 401 Unauthorized

Authentication is stateless (no sessions stored on server).

---

# 6. AI Tools Used

AI tools (ChatGPT) were used for:

* Debugging NestJS dependency injection errors
* Structuring module imports/exports correctly
* JWT strategy configuration
* Frontend–backend integration guidance

After AI-generated suggestions:

* All code was reviewed manually.
* Errors were fixed during integration.
* API flows were tested via Postman and browser DevTools.
* JWT handling and headers were verified manually.

No code was used without understanding and debugging it.

---

# 7. Decisions & Trade-offs

### 1. Context API instead of Redux

* Chosen for simplicity.
* Suitable for small-to-medium app.
* Less boilerplate.

Trade-off:

* Redux would scale better for very large apps.

---

### 2. JWT stored in localStorage

* Simple implementation.
* Easy to manage for demo project.

Trade-off:

* More secure option would be HTTP-only cookies.

---

### 3. Separate Auth and Users modules

* Keeps authentication logic isolated.
* Improves maintainability.

---

### 4. MongoDB (NoSQL)

* Flexible schema.
* Quick iteration for MVP.

Trade-off:

* No strict relational constraints like SQL.

---

### Improvements with More Time

* Add refresh tokens.
* Use HTTP-only cookies.
* Add input validation with class-validator.
* Add pagination for tasks.
* Add real time notifications using Websockets.
* Add testing (unit + integration).
* Add role-based access control.
* Deploy with Docker.

---

# Final Architecture Summary

This project follows:

* Modular backend architecture (NestJS best practices)
* Stateless JWT authentication
* Proper user-task relationship
* Clear separation of concerns
* RESTful API design
* Scalable folder structure

The system is structured for maintainability, clarity, and extensibility.


