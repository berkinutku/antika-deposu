# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-12-19

### Added
- React Native mobile application (iOS & Android support)
- Flutter mobile application (alternative implementation)
- Express.js backend API with MongoDB
- User authentication (email/password with JWT)
- Password reset functionality with email support
- Request creation system for antique car parts
  - Brand (Marka), Model, Part Name (Parça Adı), Description fields
  - Photo upload from gallery or camera
- Admin panel with search and filter functionality
  - Search by brand, model, part name, description
  - Filter by brand (Marka)
  - Filter by model
- User request management
- Image upload with Multer
- Role-based access control (Admin/User)
- iOS and Android permissions configured
- GitHub Actions workflow for iOS builds
- Comprehensive testing guides (Appetize.io, Android emulator)

### Technical Features
- JWT authentication
- MongoDB database with Mongoose
- File upload handling
- CORS configuration
- Error handling middleware
- Secure password hashing (bcrypt)
- Token-based password reset
- Email support (nodemailer) with development mode fallback

### Documentation
- README.md with setup instructions
- FREE_IOS_TESTING_GUIDE.md
- APPETIZE_TESTING_GUIDE.md
- QUICK_APPETIZE_START.md
- TESTING_GUIDE.md
- BACKEND_TUNNELING.md
- PASSWORD_RESET_SETUP.md
- QUICK_START_IOS_TESTING.md

### Security
- Password hashing with bcrypt
- JWT token authentication
- Secure file upload handling
- Input validation
- Role-based authorization


