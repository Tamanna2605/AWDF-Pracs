# Practical 7: Authentication and Middleware Pipeline

## 1. Requirements
- Node.js v18 or later
- MongoDB running locally, or a MongoDB Atlas connection string
- Postman

## 2. Install
Open Command Prompt in this project folder:

```bash
npm install
```

Create your local environment file by copying `.env.example` to `.env`.
Set a long, random `JWT_SECRET` in `.env`. Never commit `.env`.

Example local configuration:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/task_manager
JWT_SECRET=put_a_long_random_secret_here
JWT_EXPIRES_IN=1h
```

## 3. Run
```bash
npm run dev
```
API base URL: `http://localhost:5000`

## 4. API endpoints

| Method | Endpoint | Authentication | Purpose |
|---|---|---|---|
| POST | `/api/auth/register` | No | Create account |
| POST | `/api/auth/login` | No | Verify password and return JWT |
| GET | `/api/auth/me` | Bearer token | Return logged-in user |
| GET | `/api/tasks` | Bearer token | List current user's tasks |
| POST | `/api/tasks` | Bearer token | Create a task |
| GET | `/api/tasks/:id` | Bearer token | Get one of current user's tasks |
| PUT | `/api/tasks/:id` | Bearer token | Update own task |
| DELETE | `/api/tasks/:id` | Bearer token | Delete own task |

## 5. Postman testing

### Register
POST `http://localhost:5000/api/auth/register`
Body > raw > JSON:
```json
{
  "name": "Tamanna",
  "email": "tamanna@example.com",
  "password": "Password123"
}
```
Expected: `201 Created`.

### Login
POST `http://localhost:5000/api/auth/login`
Body > raw > JSON:
```json
{
  "email": "tamanna@example.com",
  "password": "Password123"
}
```
Expected: `200 OK`. Copy the `token` from the response.

### Access current user
GET `http://localhost:5000/api/auth/me`
Authorization tab > Bearer Token > paste the token.
Expected: `200 OK` with user details.

### Create task
POST `http://localhost:5000/api/tasks`
Authorization > Bearer Token.
Body > raw > JSON:
```json
{
  "title": "Complete Practical 7",
  "description": "Implement JWT authentication",
  "priority": "high"
}
```
Expected: `201 Created`.

### List tasks
GET `http://localhost:5000/api/tasks`
Authorization > Bearer Token.
Expected: `200 OK`.

### Update task
PUT `http://localhost:5000/api/tasks/PASTE_TASK_ID`
Authorization > Bearer Token.
Body:
```json
{
  "completed": true
}
```

### Delete task
DELETE `http://localhost:5000/api/tasks/PASTE_TASK_ID`
Authorization > Bearer Token.

### Negative tests
1. Call `GET /api/tasks` without a token: expect `401`.
2. Send `Authorization: Bearer abc.invalid.token`: expect `401`.
3. Register with a missing email: expect `400`.
4. Create a task with `{ "description": "No title" }`: expect `400`.
5. Use an expired JWT: expect `401` with an expiry message.

## 6. Middleware pipeline

For a protected task request:
1. Express receives the request.
2. `authMiddleware` reads the Authorization header.
3. `jwt.verify()` checks signature and expiry.
4. The decoded user ID is stored in `req.user`.
5. `validateTask` checks request body for create/update operations.
6. The controller performs the database operation for that authenticated user.
7. `errorHandler` formats unexpected errors.

## 7. Frontend logout and 401 handling

Store the token after successful login, preferably in memory or a carefully considered secure storage strategy. For a simple classroom demo, `sessionStorage` can be used:

```js
sessionStorage.setItem("token", data.token);
```

For protected requests:

```js
async function apiRequest(url, options = {}) {
  const token = sessionStorage.getItem("token");

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  });

  if (response.status === 401) {
    sessionStorage.removeItem("token");
    window.location.href = "/login";
    throw new Error("Session expired. Please log in again.");
  }

  return response;
}
```

Logout:

```js
function logout() {
  sessionStorage.removeItem("token");
  window.location.href = "/login";
}
```

For a production application, consider HttpOnly, Secure, SameSite cookies and CSRF protection rather than exposing tokens to JavaScript-accessible storage.

## 8. GitHub
Check that `.env` is not tracked:
```bash
git status
```

Commit the implementation:
```bash
git add .
git commit -m "Implement JWT authentication and middleware pipeline"
git push
```

Do not add `.env` to GitHub. `.env.example` is safe to commit because it contains placeholders only.
