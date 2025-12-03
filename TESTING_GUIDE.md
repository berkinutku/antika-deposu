# Testing Guide for Windows

## Android Emulator Setup (Windows)

### Step 1: Install Android Studio
1. Download Android Studio from: https://developer.android.com/studio
2. Run the installer and follow the setup wizard
3. Make sure to install:
   - Android SDK
   - Android SDK Platform
   - Android Virtual Device (AVD)
   - Intel x86 Emulator Accelerator (HAXM) - for better performance

### Step 2: Create an Android Virtual Device
1. Open Android Studio
2. Click "More Actions" → "Virtual Device Manager"
3. Click "Create Device"
4. Select a device (e.g., Pixel 6, Pixel 7)
5. Click "Next"
6. Select a system image (e.g., Android 13 "Tiramisu" or Android 14)
   - If not downloaded, click "Download" next to the system image
7. Click "Next" → "Finish"

### Step 3: Start the Emulator
1. In Virtual Device Manager, click the ▶️ Play button next to your AVD
2. Wait for the emulator to boot (first time may take a few minutes)
3. The emulator window should open showing an Android device

### Step 4: Run Your App
```bash
# Terminal 1: Start Metro bundler
cd AntikaDeposu
npm install
npm start

# Terminal 2: Run on Android (make sure emulator is running first)
npm run android
```

### Troubleshooting Android
- **Emulator is slow**: Enable hardware acceleration (HAXM) in Android Studio settings
- **App won't connect to backend**: 
  - For emulator: `localhost:4000` should work
  - For physical device: Use your computer's IP address (e.g., `192.168.1.100:4000`)
  - Update `AntikaDeposu/src/api/client.ts` with your IP if needed
- **"SDK location not found"**: Set `ANDROID_HOME` environment variable to your SDK path

---

## iOS Testing Options (Windows)

⚠️ **Important**: iOS Simulator only runs on macOS. On Windows, you have these options:

### ✅ **FREE SOLUTION: See `FREE_IOS_TESTING_GUIDE.md`**

**Quick Summary**: Use GitHub Actions (free) to build iOS app + Appetize.io (100 free min/month) to test = **Completely Free!**

### Option 1: Cloud-Based iOS Simulators (Recommended for Testing)

#### Appetize.io (Free tier available)
1. Go to https://appetize.io
2. Upload your iOS build (requires building on macOS first)
3. Test in browser-based iOS simulator
4. **Limitation**: Requires building the app first (needs macOS or CI/CD)
5. **Solution**: Use GitHub Actions workflow (already set up in `.github/workflows/ios-build.yml`) to build for free!

#### BrowserStack (Paid, but comprehensive)
1. Go to https://www.browserstack.com
2. Sign up for App Live testing
3. Upload your app and test on real iOS devices in the cloud
4. Supports both simulators and real devices

#### Sauce Labs (Paid)
1. Similar to BrowserStack
2. Cloud-based device testing platform

### Option 2: Physical iOS Device (Best for Real Testing)

1. Connect your iPhone/iPad via USB
2. Enable Developer Mode on your device (Settings → Privacy & Security → Developer Mode)
3. Trust your computer when prompted
4. You'll still need macOS to build and deploy, OR:
   - Use a cloud Mac service (see Option 3)
   - Use a friend's Mac to build the app
   - Use CI/CD service (GitHub Actions with macOS runner)

### Option 3: Cloud Mac Services (For Full iOS Development)

#### MacStadium
- Rent a Mac in the cloud
- Full macOS access for Xcode and iOS development
- Pricing: ~$99/month

#### AWS EC2 Mac Instances
- Amazon provides macOS instances
- Pay per hour usage
- Good for occasional iOS builds

#### GitHub Actions (Free for public repos)
- Use macOS runners to build iOS apps
- Can't interactively test, but can build and deploy

### Option 4: Use Flutter App Instead

Since you have a Flutter version (`antika_deposu/`), you can test that on both platforms more easily:

```bash
cd antika_deposu
flutter doctor  # Check setup
flutter emulators  # List available emulators
flutter run  # Run on connected device/emulator
```

Flutter on Windows can:
- ✅ Run Android emulators
- ❌ Cannot run iOS simulators (still needs macOS)
- ✅ Can build for iOS if you have access to a Mac

---

## Recommended Testing Strategy for Windows

### For Android:
1. ✅ Use Android Studio emulator (fully supported on Windows)
2. ✅ Test on physical Android device via USB debugging

### For iOS:
1. **Short term**: Use cloud services (Appetize.io, BrowserStack) for testing
2. **Long term**: 
   - Get access to a Mac (physical or cloud) for development
   - Or focus on Android development and test iOS later
   - Or use the Flutter version which has better cross-platform tooling

---

## Quick Start Commands

### Android (Windows)
```bash
# 1. Start Android emulator from Android Studio, or:
emulator -avd <YOUR_AVD_NAME>

# 2. Start Metro bundler
cd AntikaDeposu
npm start

# 3. In another terminal, run Android app
npm run android
```

### Backend (Required for both)
```bash
cd backend
npm install
# Create .env file with MONGODB_URI and JWT_SECRET
npm run dev
# Backend runs on http://localhost:4000
```

### Check Connected Devices
```bash
# List all connected devices/emulators
adb devices

# React Native will automatically detect and use available devices
```

---

## Network Configuration for Emulator

### Android Emulator:
- `localhost` or `127.0.0.1` → Points to emulator itself
- `10.0.2.2` → Points to your Windows host machine
- If backend is on `localhost:4000`, use `10.0.2.2:4000` in the app

### Update API URL for Android Emulator:
Edit `AntikaDeposu/src/api/client.ts`:
```typescript
// For Android emulator, use:
const API_BASE_URL = 'http://10.0.2.2:4000/api';

// For physical device, use your computer's IP:
// const API_BASE_URL = 'http://192.168.1.100:4000/api';
```

---

## Troubleshooting

### Android Emulator Issues:
- **"No devices found"**: Make sure emulator is running and `adb devices` shows it
- **"SDK not found"**: Set `ANDROID_HOME` environment variable
- **Slow performance**: Enable hardware acceleration in Android Studio

### Backend Connection Issues:
- Check backend is running: `curl http://localhost:4000/api/health` (if endpoint exists)
- Check firewall isn't blocking port 4000
- For emulator, use `10.0.2.2` instead of `localhost`

### Metro Bundler Issues:
- Clear cache: `npm start -- --reset-cache`
- Kill all Node processes and restart

