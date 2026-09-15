# Campus Resource Hub

Campus Resource Hub is a full-stack web application that allows students to upload, find, view, and download academic resources such as **question papers and assignments**.

The application provides authenticated access to resources and allows users to filter resources based on department, semester, subject, resource type, and academic year.

---

## Features

* User registration and login
* JWT-based authentication
* Protected routes
* Automatic JWT handling using Axios interceptors
* Upload question papers and assignments
* PDF file upload using Multer
* View PDF files
* Download PDF files
* Track resource download count
* Filter resources by:

  * Department
  * Semester
  * Subject
  * Resource Type
  * Academic Year
* Pagination for resources
* User-specific resource authorization
* Delete uploaded resources
* Update uploaded resources
* Responsive and clean user interface

---

## Tech Stack

### Frontend

* React.js
* React Router
* Axios
* JavaScript
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Multer

---

## Project Structure

```text
Campus Resource Hub/
│
├── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── Navbar.css
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Home.css
│   │   │   ├── Login.jsx
│   │   │   ├── Login.css
│   │   │   ├── Register.jsx
│   │   │   ├── Register.css
│   │   │   ├── Resources.jsx
│   │   │   ├── Resources.css
│   │   │   ├── UploadResource.jsx
│   │   │   └── UploadResource.css
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
└── backend/
    ├── src/
    │   ├── config/
    │   ├── controllers/
    │   ├── middleware/
    │   ├── models/
    │   ├── routes/
    │   └── server.js
    │
    ├── uploads/
    ├── .env
    └── package.json
```

---

## Authentication

The application uses **JWT (JSON Web Tokens)** for authentication.

### Login Flow

```text
User Login
    ↓
Backend verifies credentials
    ↓
JWT generated
    ↓
JWT returned to frontend
    ↓
Token stored in localStorage
    ↓
Axios interceptor adds JWT
    ↓
Protected API requests
```

Protected backend requests require:

```text
Authorization: Bearer <JWT>
```

The frontend automatically adds the token to requests using an Axios interceptor.

---

## Resource Upload Flow

```text
Student
   ↓
Upload Resource
   ↓
JWT Authentication
   ↓
Multer
   ↓
PDF stored in uploads/
   ↓
Resource information stored in MongoDB
```

The database stores information such as:

* Title
* Subject
* Department
* Semester
* Academic Year
* Resource Type
* Description
* File Name
* File Path
* Uploaded By
* Download Count

---

## API Endpoints

### Authentication

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login user          |

### Resources

| Method | Endpoint                            | Description        |
| ------ | ----------------------------------- | ------------------ |
| POST   | `/api/resource/uploadResource`      | Upload a resource  |
| GET    | `/api/resource/getAllResources`     | Get resources      |
| GET    | `/api/resource/getresourceById/:id` | Get resource by ID |
| GET    | `/api/resource/download/:id`        | Download resource  |
| PUT    | `/api/resource/updateResource/:id`  | Update resource    |
| DELETE | `/api/resource/deleteResource/:id`  | Delete resource    |

All resource endpoints require authentication.

---

## Filtering

Resources can be filtered using query parameters.

Example:

```text
GET /api/resource/getAllResources?department=CSE&semester=7
```

Available filters:

```text
department
semester
subject
resourceType
academicYear
```

Pagination is also supported:

```text
GET /api/resource/getAllResources?page=1&limit=10
```

---

## Installation and Setup

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
```

```bash
cd Campus-Resource-Hub
```

---

## Backend Setup

Go to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:3000
```

---

## Frontend Setup

Open another terminal and go to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

---

## Environment Variables

The backend requires the following environment variables:

| Variable     | Description                        |
| ------------ | ---------------------------------- |
| `PORT`       | Backend server port                |
| `MONGO_URI`  | MongoDB connection string          |
| `JWT_SECRET` | Secret key used to sign JWT tokens |

Do not commit your `.env` file to GitHub.

Make sure `.env` is included in `.gitignore`.

---

## How It Works

### Student Registration

A student creates an account by providing:

```text
Name
Email
Password
Department
Semester
```

### Login

The user logs in using their email and password.

The backend validates the credentials and returns a JWT.

### Browse Resources

Authenticated users can view available question papers and assignments.

### Filter Resources

Users can filter resources according to their academic requirements.

### Upload Resource

Authenticated users can upload a PDF along with its academic information.

### Download Resource

Users can download resources through the authenticated download endpoint.

The backend also maintains a `downloadCount` for each resource.

### Logout

Logout removes the JWT from the browser's local storage and prevents access to protected frontend routes.

---

## Future Improvements

* Admin dashboard
* Cloudinary or cloud-based file storage
* Advanced search
* User profiles
* Resource ratings and reviews
* AI-powered resource recommendations
* Better resource categorization
* Analytics dashboard
* Improved file validation
* Deployment to production

---

## Author

Developed as a full-stack MERN project to provide students with a centralized platform for accessing and sharing academic resources.
