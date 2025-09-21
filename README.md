# 🎓 Student Feedback Management System

A comprehensive backend system built with Node.js, Express, and MongoDB for managing student feedback collection and administration. The system provides secure authentication, role-based access control, and complete feedback management capabilities.

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-blue)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.x-green)](https://mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-orange)](https://jwt.io/)

## ✨ Key Features

- **🔐 Secure Authentication**: JWT-based authentication with role-based access control
- **👥 User Management**: Separate interfaces for Students and Administrators
- **📝 Feedback System**: Complete CRUD operations for course feedback
- **👤 Profile Management**: Student profile creation with image upload support
- **📚 Course Management**: Admin-controlled course creation and management
- **🔄 Password Reset**: OTP-based secure password reset functionality
- **📊 Admin Dashboard**: Comprehensive feedback analytics and user management
- **📤 Data Export**: CSV export functionality for feedback data
- **☁️ Cloud Storage**: Cloudinary integration for profile image storage

## 🛠️ Technology Stack

| Component | Technology |
|-----------|------------|
| **Runtime** | Node.js |
| **Framework** | Express.js v5.1.0 |
| **Database** | MongoDB with Mongoose v8.18.1 |
| **Authentication** | JWT (JSON Web Tokens) v9.0.2 |
| **Image Storage** | Cloudinary v1.41.3 |
| **File Handling** | Multer v2.0.2 + multer-storage-cloudinary v4.0.0 |
| **Security** | bcryptjs v3.0.2 for password hashing |
| **Email Service** | Nodemailer v7.0.6 |
| **Validation** | express-validator v7.2.1 |
| **CSV Export** | json2csv v6.0.0-alpha.2 |
| **Environment** | dotenv v17.2.2 |
| **Logging** | morgan v1.10.1 |
| **Cookies** | cookie-parser v1.4.7 |
| **CORS** | cors v2.8.5 |

## 📋 Prerequisites

- Node.js (v18.x or higher)
- MongoDB (v6.x or higher - compatible with Mongoose 8.18.1)
- npm or yarn package manager
- Cloudinary account for image storage
- Email service for OTP functionality (Gmail recommended for Nodemailer)

## ⚙️ Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/Risheek2627/Student_feedback.git
cd Student_feedback/backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the backend directory:

```env
# Database Configuration
MONGO_URI=mongodb://localhost:27017/studentfeedback

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Email Configuration
NODEMAILER_EMAIL=your_email@gmail.com
NODEMAILER_PASSWORD=your_app_password

# Server Configuration
PORT=3000
```

### 4. Start the Application
```bash
# Development mode (manual restart)
node index.js

# Development with auto-restart (using nodemon)
npx nodemon index.js

# Production mode
NODE_ENV=production node index.js
```

🚀 **Server will be running on:** `http://localhost:3000`

> **Note**: The PORT is configured via environment variables. Make sure to set `PORT=3000` in your `.env` file.

## 📚 API Documentation

### Base URL
```
http://localhost:3000
```

### 🔑 Authentication Endpoints

#### User Registration
```http
POST /auth/signup
```
**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### User Login
```http
POST /auth/login
```
**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": "64abc123efgh4567",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  },
  "token": "jwt_token_here"
}
```

### 👤 Profile Management (Students)

**Note**: Profile data is integrated within the User model, not a separate collection.

#### Add Profile
```http
POST /profile/add
Authorization: Bearer <token>
Content-Type: multipart/form-data
```
**Form Data:**
- `phone`: string (optional)
- `dob`: date (YYYY-MM-DD format, optional)
- `address`: string (optional)
- `profilePic`: file (optional - stores URL and public_id for Cloudinary)

#### Update Profile
```http
PUT /profile/edit
Authorization: Bearer <token>
Content-Type: multipart/form-data
```
**Form Data:** (same as add profile - updates existing fields)

#### View Profile
```http
GET /profile/view
Authorization: Bearer <token>
```
**Response includes:** User details with integrated profile fields (phone, dob, address, profilePic)

### 📚 Course Management (Admin Only)

#### Add Course
```http
POST /course/add
Authorization: Bearer <admin_token>
```
**Request Body:**
```json
{
  "title": "JavaScript for Beginners",
  "author": "Hitesh Choudhary",
  "description": "Complete JavaScript course from zero to hero"
}
```

#### Update Course
```http
POST /course/update/:courseId
Authorization: Bearer <admin_token>
```

#### Delete Course
```http
POST /course/delete/:courseId
Authorization: Bearer <admin_token>
```

### 📝 Feedback Management

#### Add Feedback
```http
POST /feedback/add/:courseId
Authorization: Bearer <token>
```
**Request Body:**
```json
{
  "rating": 4,
  "message": "Excellent course content!"
}
```
**Validation:**
- `rating`: Number (1-5, as per schema constraints)
- `message`: String (optional)
- `course`: Automatically linked via URL parameter
- `student`: Automatically linked via JWT token

#### Update Feedback
```http
POST /feedback/update/:feedbackId
Authorization: Bearer <token>
```

#### Delete Feedback
```http
POST /feedback/delete/:feedbackId
Authorization: Bearer <token>
```

#### View My Feedbacks (Students)
```http
GET /feedback/view?page=1&limit=5
Authorization: Bearer <token>
```

#### Admin View All Feedbacks
```http
GET /feedback/AdminView
Authorization: Bearer <admin_token>
```

#### Export Feedbacks to CSV
```http
GET /feedback/export
Authorization: Bearer <admin_token>
```

### 🔄 Password Reset

#### Send OTP
```http
POST /reset/sendotp
```
**Request Body:**
```json
{
  "email": "user@example.com"
}
```

#### Verify OTP
```http
POST /reset/verifyotp
```
**Request Body:**
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

#### Reset Password
```http
POST /reset/password
```
**Request Body:**
```json
{
  "email": "user@example.com",
  "newPassword": "newSecurePassword",
  "renterPassword": "newSecurePassword"
}
```

#### Change Password (Authenticated)
```http
POST /reset/changePassword
Authorization: Bearer <token>
```
**Request Body:**
```json
{
  "newPassword": "newSecurePassword",
  "renterPassword": "newSecurePassword"
}
```

### 👨‍💻 Admin Operations

#### Get Total Feedback Count
```http
GET /admin/totalFeedback
Authorization: Bearer <admin_token>
```

#### Get Course-Specific Feedback
```http
POST /admin/courseFeedback/:courseId
Authorization: Bearer <admin_token>
```

#### View Registered Students
```http
GET /admin/registeredStudents
Authorization: Bearer <admin_token>
```

#### Block Student
```http
POST /admin/block/:studentId
Authorization: Bearer <admin_token>
```

#### Unblock Student
```http
POST /admin/unblock/:studentId
Authorization: Bearer <admin_token>
```

#### Delete Student
```http
POST /admin/delete/:studentId
Authorization: Bearer <admin_token>
```

#### Get Course Average Rating
```http
POST /admin/average/:courseId
Authorization: Bearer <admin_token>
```


## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for secure password storage
- **Role-Based Access**: Separate permissions for students and admins
- **Input Validation**: Comprehensive request validation
- **CORS Protection**: Configured for cross-origin requests
- **Environment Variables**: Sensitive data protection

## 📊 Database Schema

### User Model
```javascript
{
  // Authentication Fields
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "admin"], default: "student" },
  isBlocked: { type: Boolean, default: false },
  
  // Password Reset Fields
  resetOtp: String,
  resetOtpExpriry: Date,
  
  // Profile Fields (Integrated)
  phone: String,
  dob: Date,
  address: String,
  profilePic: {
    url: String,
    public_id: String
  },
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date
}
```

### Course Model
```javascript
{
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: String,
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date
}
```

### Feedback Model
```javascript
{
  course: { 
    type: ObjectId, 
    ref: "Course", 
    required: true 
  },
  student: { 
    type: ObjectId, 
    ref: "User" 
  },
  rating: { 
    type: Number, 
    min: 1, 
    max: 5 
  },
  message: String,
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date
}
```



## 🧪 Testing

### Using Postman
Import the provided Postman collection file: `Student Feedback.postman_collection.json`

### Example Test Flow
1. **Register** a new user
2. **Login** to get JWT token
3. **Add profile** information
4. **Create course** (admin only)
5. **Submit feedback** for the course
6. **View feedbacks** and analytics


## 👨‍💻 Author

**Risheek**
- GitHub: [@Risheek2627](https://github.com/Risheek2627)
- Email: risheek2627@gmail.com

## 🙏 Acknowledgments

- [Express.js](https://expressjs.com/) for the robust web framework
- [MongoDB](https://mongodb.com/) for the flexible database
- [Cloudinary](https://cloudinary.com/) for image storage solutions
- [JWT](https://jwt.io/) for secure authentication

---

⭐ **Star this repository if you find it helpful!**

📧 **For support or queries, please open an issue on GitHub**
