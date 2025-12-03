# Antika Deposu - Project Structure (Version 1.0.0)

## 📁 Root Directory Structure

```
AntikaDeposu/
├── 📱 AntikaDeposu/              # React Native App (iOS & Android)
├── 📱 antika_deposu/             # Flutter App (Alternative)
├── 🔧 backend/                   # Express.js Backend API
├── 📄 Documentation Files
└── ⚙️ Configuration Files
```

## 📱 React Native App (`AntikaDeposu/`)

```
AntikaDeposu/
├── android/                      # Android native code
│   └── app/src/main/
│       └── AndroidManifest.xml   # Android permissions
├── ios/                          # iOS native code
│   └── AntikaDeposu/
│       └── Info.plist            # iOS permissions
├── src/
│   ├── api/                      # API client
│   │   ├── auth.ts              # Authentication API
│   │   ├── client.ts            # Axios client
│   │   └── requests.ts          # Requests API
│   ├── screens/                  # App screens
│   │   ├── Admin/               # Admin screens
│   │   │   ├── AdminHomeScreen.tsx
│   │   │   └── AdminLoginScreen.tsx
│   │   ├── Auth/                # Authentication screens
│   │   │   ├── ForgotPasswordScreen.tsx
│   │   │   ├── LoginScreen.tsx
│   │   │   ├── ResetPasswordScreen.tsx
│   │   │   └── SignupScreen.tsx
│   │   ├── Home/                # Home screen
│   │   │   └── HomeScreen.tsx
│   │   └── Requests/            # Request screens
│   │       ├── MyRequestsScreen.tsx
│   │       └── RequestFormScreen.tsx
│   ├── navigation/              # Navigation setup
│   │   └── AppNavigator.tsx
│   ├── hooks/                   # Custom hooks
│   │   └── useAuth.ts
│   ├── context/                 # React context
│   │   └── AuthContext.tsx
│   └── utils/                   # Utilities
│       └── storage.ts
├── package.json                 # Dependencies (v1.0.0)
└── App.tsx                      # Main app component
```

## 📱 Flutter App (`antika_deposu/`)

```
antika_deposu/
├── lib/
│   ├── screens/                  # App screens
│   │   ├── admin/              # Admin screens
│   │   ├── auth/               # Authentication screens
│   │   ├── home/                # Home screen
│   │   └── requests/            # Request screens
│   ├── providers/               # State management
│   ├── services/                # API services
│   ├── models/                  # Data models
│   ├── widgets/                 # Reusable widgets
│   └── utils/                   # Utilities
├── pubspec.yaml                 # Dependencies (v1.0.0+1)
└── assets/                      # Images and assets
```

## 🔧 Backend (`backend/`)

```
backend/
├── src/
│   ├── config/                  # Configuration
│   │   └── db.js               # MongoDB connection
│   ├── controllers/             # Route controllers
│   │   ├── authController.js    # Auth logic
│   │   └── requestController.js # Request logic
│   ├── models/                  # Database models
│   │   ├── User.js              # User model
│   │   └── Request.js           # Request model
│   ├── routes/                  # API routes
│   │   ├── authRoutes.js        # Auth endpoints
│   │   └── requestRoutes.js     # Request endpoints
│   ├── middleware/              # Express middleware
│   │   ├── auth.js              # JWT authentication
│   │   ├── authorizeRole.js     # Role authorization
│   │   └── errorHandler.js     # Error handling
│   ├── utils/                   # Utilities
│   │   ├── token.js             # JWT token utils
│   │   ├── upload.js            # File upload (Multer)
│   │   └── email.js             # Email service
│   └── index.js                 # Server entry point
├── uploads/                     # Uploaded files directory
└── package.json                 # Dependencies (v1.0.0)
```

## 📄 Documentation Files

```
Root/
├── README.md                    # Main project documentation
├── CHANGELOG.md                 # Version history
├── VERSION                      # Current version (1.0.0)
├── VERSION_INFO.md              # Version details
├── PROJECT_STRUCTURE.md         # This file
├── TESTING_GUIDE.md             # Testing instructions
├── FREE_IOS_TESTING_GUIDE.md   # iOS testing on Windows
├── APPETIZE_TESTING_GUIDE.md   # Appetize.io guide
├── QUICK_APPETIZE_START.md     # Quick Appetize guide
├── QUICK_START_IOS_TESTING.md  # Quick iOS testing
├── BACKEND_TUNNELING.md        # Backend tunneling guide
└── PASSWORD_RESET_SETUP.md    # Password reset setup
```

## ⚙️ Configuration Files

```
Root/
├── .github/
│   └── workflows/
│       └── ios-build.yml        # GitHub Actions iOS build
└── (Git configuration files)
```

## 🎯 Key Features by Directory

### Authentication (`src/screens/Auth/`)
- ✅ Login/Register
- ✅ Password reset (forgot password)
- ✅ Password reset (with token)
- ✅ Admin login

### Requests (`src/screens/Requests/`)
- ✅ Create request with photo (camera/gallery)
- ✅ View user's requests
- ✅ Request form with validation

### Admin (`src/screens/Admin/`)
- ✅ Admin login
- ✅ View all requests
- ✅ Search and filter (brand, model)

### Backend API
- ✅ `/api/auth/signup` - User registration
- ✅ `/api/auth/login` - User login
- ✅ `/api/auth/forgot-password` - Request password reset
- ✅ `/api/auth/reset-password` - Reset password with token
- ✅ `/api/requests/create` - Create request
- ✅ `/api/requests/user/:id` - Get user requests
- ✅ `/api/requests/all` - Get all requests (admin)

## 📦 Version Information

**Current Version:** 1.0.0  
**Release Date:** December 19, 2024

- React Native App: 1.0.0
- Flutter App: 1.0.0+1
- Backend API: 1.0.0

## 🔐 Permissions

### iOS (`Info.plist`)
- ✅ `NSPhotoLibraryUsageDescription` - Photo library access
- ✅ `NSCameraUsageDescription` - Camera access

### Android (`AndroidManifest.xml`)
- ✅ `READ_MEDIA_IMAGES` - Read images (Android 13+)
- ✅ `READ_EXTERNAL_STORAGE` - Read storage (Android <13)
- ✅ `CAMERA` - Camera access

## 🚀 Quick Start

1. **Backend:** `cd backend && npm install && npm run dev`
2. **React Native:** `cd AntikaDeposu && npm install && npm run android/ios`
3. **Flutter:** `cd antika_deposu && flutter pub get && flutter run`

For detailed setup, see [README.md](./README.md)


