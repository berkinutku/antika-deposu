# BrowserStack Testing Guide

BrowserStack requires `.apk`, `.aab`, or `.ipa` files for testing on real devices in the cloud.

## 📦 Build Files Needed

- **Android**: `.apk` or `.aab` file
- **iOS**: `.ipa` file (requires code signing)

---

## 🚀 Quick Start: Build for BrowserStack

### Step 1: Trigger GitHub Actions Build

#### For Android APK/AAB:

1. Go to your GitHub repository
2. Click "Actions" tab
3. Select "Build Android App" workflow
4. Click "Run workflow" → "Run workflow" button
5. Wait for build to complete (~10-15 minutes)

#### For iOS IPA:

**Note**: iOS IPA requires code signing with Apple Developer account ($99/year). If you don't have one, use Appetize.io instead (see `APPETIZE_TESTING_GUIDE.md`).

---

## 📱 Android APK/AAB Build

### Option 1: GitHub Actions (Recommended - Free)

The workflow is already set up at `.github/workflows/android-build.yml`. It will create:
- ✅ `android-apk-build` artifact (APK file)
- ✅ `android-aab-build` artifact (AAB file)

#### Steps:

1. **Push to GitHub** (or manually trigger workflow)
   ```bash
   git add .
   git commit -m "Build Android for BrowserStack"
   git push
   ```

2. **Wait for Build** (10-15 minutes)
   - Go to: `https://github.com/YOUR_USERNAME/YOUR_REPO/actions`
   - Watch "Build Android App" workflow
   - Wait for green checkmark ✅

3. **Download Artifacts**
   - Click on completed workflow
   - Scroll down to "Artifacts"
   - Download `android-apk-build` (APK) or `android-aab-build` (AAB)

### Option 2: Build Locally (Windows)

If you have Android Studio installed:

```bash
cd AntikaDeposu/android
./gradlew assembleRelease

# APK will be at:
# AntikaDeposu/android/app/build/outputs/apk/release/app-release.apk

# For AAB:
./gradlew bundleRelease
# AAB will be at:
# AntikaDeposu/android/app/build/outputs/bundle/release/app-release.aab
```

**Windows Note**: Use `gradlew.bat` instead of `./gradlew`:
```bash
gradlew.bat assembleRelease
```

---

## 🍎 iOS IPA Build

**⚠️ Important**: iOS IPA requires:
1. Apple Developer Account ($99/year)
2. Code signing certificates
3. Provisioning profiles

### Option 1: GitHub Actions (Requires Setup)

You need to:
1. Set up code signing secrets in GitHub
2. Configure signing certificates

This is complex. **Recommendation**: Use Appetize.io for iOS testing (see `APPETIZE_TESTING_GUIDE.md`).

### Option 2: Build Locally (macOS Required)

```bash
cd AntikaDeposu/ios
pod install
# Then build in Xcode with proper code signing
```

---

## 🌐 Upload to BrowserStack

### Step 1: Sign Up / Login

1. Go to https://www.browserstack.com
2. Sign up for free trial (100 minutes free)
3. Login to your account

### Step 2: Upload Your App

1. Go to BrowserStack Dashboard
2. Click "App Live" or "App Automate"
3. Click "Upload" button
4. Select your file:
   - Android: `.apk` or `.aab` file
   - iOS: `.ipa` file
5. Wait for upload and processing (1-2 minutes)

### Step 3: Test Your App

1. Select a device from the list
2. Click "Launch" or "Test"
3. Your app will open in the cloud device
4. Start testing!

---

## 📋 BrowserStack Features

### Free Trial:
- ✅ 100 minutes of device testing
- ✅ Access to real devices
- ✅ Screenshot capability
- ✅ Video recording
- ✅ Log viewing
- ✅ Network throttling

### Supported:
- ✅ Android (APK, AAB)
- ✅ iOS (IPA)
- ✅ Real devices (not simulators)
- ✅ Multiple device models and OS versions

---

## 🔧 Backend Configuration

Your backend needs to be publicly accessible for BrowserStack testing.

### Option 1: ngrok (Quick Testing)

```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Start ngrok
ngrok http 4000
# Copy the https URL (e.g., https://abc123.ngrok.io)
```

**Update API URL** in `AntikaDeposu/src/api/client.ts`:
```typescript
const API_BASE_URL = 'https://abc123.ngrok.io/api';
```

**Rebuild** the app after changing API URL!

### Option 2: Deploy Backend (Permanent)

Deploy backend to Render, Railway, or Heroku:
- Update `API_BASE_URL` in your app
- Rebuild and upload to BrowserStack

See `BACKEND_TUNNELING.md` for more options.

---

## 🐛 Troubleshooting

### APK Won't Upload

**Issue**: "Invalid APK file"
- **Solution**: Make sure you're uploading the `.apk` file (not `.aab` or `.zip`)
- **Solution**: Check file size (should be under 500MB typically)

**Issue**: "Corrupted APK"
- **Solution**: Rebuild the APK
- **Solution**: Try building locally to check for errors

### App Crashes on Launch

**Issue**: App crashes immediately
- **Solution**: Check BrowserStack logs (Logs tab)
- **Solution**: Verify backend is accessible
- **Solution**: Check API URL is correct
- **Solution**: Verify all permissions are set in AndroidManifest.xml

### Backend Connection Issues

**Issue**: "Network Error" or "Connection Failed"
- **Solution**: Make sure backend is publicly accessible (use ngrok or deploy)
- **Solution**: Check CORS settings in backend
- **Solution**: Verify API URL in `AntikaDeposu/src/api/client.ts`
- **Solution**: Test backend URL in browser first

### Build Fails

**Issue**: GitHub Actions build fails
- **Solution**: Check build logs in GitHub Actions
- **Solution**: Verify Android SDK is set up correctly
- **Solution**: Check for dependency issues

**Issue**: Local build fails
- **Solution**: Make sure Android Studio and SDK are installed
- **Solution**: Run `cd AntikaDeposu && npm install` first
- **Solution**: Check Java version (need Java 17)

---

## 💡 Pro Tips

1. **Use APK for Testing**: APK is faster to build and test
2. **Use AAB for Production**: AAB is required for Google Play Store
3. **Save Minutes**: Close BrowserStack sessions when not testing
4. **Backend Setup**: Use ngrok for quick tests, deploy for production
5. **Multiple Devices**: Test on different Android/iOS versions
6. **Network Testing**: Use BrowserStack's network throttling feature

---

## 📊 Comparison: BrowserStack vs Appetize.io

| Feature | BrowserStack | Appetize.io |
|---------|--------------|-------------|
| **Free Tier** | 100 min (one-time trial) | 100 min/month |
| **Build Type** | APK/AAB/IPA | .app/.ipa/.apk |
| **Devices** | Real devices | Simulators |
| **Setup** | More complex | Easier |
| **Best For** | Production testing | Development testing |

**Recommendation**:
- **Development/Quick Testing**: Use Appetize.io (see `APPETIZE_TESTING_GUIDE.md`)
- **Production/Real Device Testing**: Use BrowserStack

---

## ✅ Quick Checklist

Before uploading to BrowserStack:

- [ ] APK/AAB/IPA file built successfully
- [ ] Backend is publicly accessible (ngrok or deployed)
- [ ] API URL updated in `AntikaDeposu/src/api/client.ts`
- [ ] App rebuilt with new API URL (if changed)
- [ ] BrowserStack account created
- [ ] File ready to upload (under size limit)

---

## 🎯 Next Steps

1. ✅ Build Android APK using GitHub Actions
2. ✅ Download the APK artifact
3. ✅ Setup backend (ngrok or deploy)
4. ✅ Update API URL and rebuild
5. ✅ Upload to BrowserStack
6. ✅ Start testing!

For iOS testing without Apple Developer account, see `APPETIZE_TESTING_GUIDE.md`.

