# Quick Start: BrowserStack Testing (10 Minutes)

## 📱 For Android APK

### Step 1: Build APK (5 min)
1. Go to GitHub → Actions
2. Run "Build Android App" workflow
3. Wait for completion ✅
4. Download `android-apk-build` artifact

### Step 2: Setup Backend (2 min)
```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Start ngrok
ngrok http 4000
# Copy https URL (e.g., https://abc123.ngrok.io)
```

**Update API URL** in `AntikaDeposu/src/api/client.ts`:
```typescript
const API_BASE_URL = 'https://abc123.ngrok.io/api';
```

**Rebuild APK** (push to GitHub → trigger workflow again)

### Step 3: Upload to BrowserStack (3 min)
1. Go to https://www.browserstack.com
2. Sign up (free 100 min trial)
3. Upload your APK file
4. Select device → Launch → Test! 🎉

---

## 🍎 For iOS IPA

**⚠️ Requires Apple Developer Account ($99/year)**

If you don't have one:
- Use **Appetize.io** instead (see `QUICK_APPETIZE_START.md`)
- Free 100 minutes/month
- Works with `.app` files (no code signing needed)

---

## 📋 Files Needed

- **Android**: `.apk` or `.aab` file
- **iOS**: `.ipa` file (requires code signing)

---

## 🔗 Full Guide

See `BROWSERSTACK_TESTING_GUIDE.md` for detailed instructions.

