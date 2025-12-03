# Free iOS Testing on Windows - Complete Guide

This guide shows you how to test your iOS app on Windows **completely free** using GitHub Actions and cloud services.

## 🎯 Best Free Solution: GitHub Actions + Appetize.io

### Overview
1. **GitHub Actions** (Free for public repos) - Builds your iOS app on macOS in the cloud
2. **Appetize.io** (100 free minutes/month) - Tests your built app in a browser-based iOS simulator

---

## Method 1: GitHub Actions + Appetize.io (Recommended)

### Step 1: Push Your Code to GitHub

1. Create a GitHub repository (if you haven't already)
2. Push your code:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2: Set Up GitHub Actions Workflow

The workflow file (`.github/workflows/ios-build.yml`) is already created in your project. It will:
- Build your iOS app on macOS (free GitHub Actions runner)
- Create an artifact you can download
- Run automatically on every push

**Note**: Make sure your repo is **public** to get free GitHub Actions minutes (2000 minutes/month for private repos, unlimited for public).

### Step 3: Download the Built App

1. Go to your GitHub repository
2. Click "Actions" tab
3. Click on the latest workflow run
4. Scroll down to "Artifacts"
5. Download `ios-app-build.zip`
6. Extract the `.app` file

### Step 4: Test on Appetize.io (Free)

1. Go to https://appetize.io
2. Sign up for a free account (100 minutes/month free)
3. Click "Upload" or "New App"
4. Upload your `.app` file (or the zip file)
5. Wait for processing (usually 1-2 minutes)
6. Test your app in the browser-based iOS simulator!

**Appetize.io Free Tier:**
- ✅ 100 minutes/month free
- ✅ Browser-based iOS simulator
- ✅ Multiple device options (iPhone, iPad)
- ✅ Screen recording
- ✅ Console logs

---

## Method 2: Physical iPhone + GitHub Actions (If You Have an iPhone)

If you have a physical iPhone, you can install the app directly:

### Step 1: Build with GitHub Actions
Same as Method 1, but we'll create an IPA file.

### Step 2: Install on Your iPhone

**Option A: Using TestFlight (Free, but requires Apple Developer account - $99/year)**
- Not free, but if you have a developer account, this is the easiest

**Option B: Using AltStore (Free, no developer account needed)**
1. Install AltStore on your iPhone: https://altstore.io
2. Download the IPA from GitHub Actions
3. Use AltStore to install it on your device
4. Refresh weekly (free limitation)

**Option C: Using Sideloadly (Free, no developer account needed)**
1. Download Sideloadly: https://sideloadly.io
2. Connect your iPhone via USB
3. Load the IPA file
4. Install on device

---

## Method 3: Use the Flutter Version (Alternative)

You already have a Flutter version (`antika_deposu/`). Flutter has better cross-platform tooling:

### For iOS Testing with Flutter:
1. Use GitHub Actions to build Flutter iOS app
2. Or use Codemagic (free tier: 500 build minutes/month)
3. Or use AppCircle (free tier available)

**Codemagic Setup:**
1. Sign up at https://codemagic.io (free tier)
2. Connect your GitHub repo
3. Select Flutter project
4. Build iOS app in the cloud
5. Download and test on Appetize.io

---

## Method 4: BrowserStack Free Trial (Limited)

1. Sign up for BrowserStack: https://www.browserstack.com
2. Free trial: 100 minutes of device testing
3. Upload your app
4. Test on real iOS devices in the cloud

**Note**: This is a one-time trial, not a permanent free solution.

---

## Quick Start: Testing Right Now

### Fastest Way to Test iOS Today:

1. **Push to GitHub** (make repo public for unlimited free minutes)
   ```bash
   git add .
   git commit -m "Add iOS build workflow"
   git push
   ```

2. **Wait for GitHub Actions to build** (~5-10 minutes)
   - Go to your repo → Actions tab
   - Watch the build progress

3. **Download the artifact**
   - Click on completed workflow
   - Download `ios-app-build.zip`

4. **Upload to Appetize.io**
   - Extract the `.app` file
   - Upload to https://appetize.io
   - Start testing!

---

## Troubleshooting

### GitHub Actions Build Fails

**Issue**: "Code signing required"
- **Solution**: The workflow uses `CODE_SIGNING_ALLOWED=NO` for simulator builds, which should work. If it fails, you may need to adjust the build settings.

**Issue**: "Pod install fails"
- **Solution**: Make sure `ios/Podfile` is correct. The workflow installs CocoaPods automatically.

**Issue**: "Node version mismatch"
- **Solution**: The workflow uses Node 20. If your project needs a different version, update `.github/workflows/ios-build.yml`.

### Appetize.io Issues

**Issue**: "App won't upload"
- **Solution**: Make sure you're uploading the `.app` file (not the `.zip`). Appetize.io accepts both, but `.app` is preferred.

**Issue**: "App crashes on launch"
- **Solution**: Check the console logs in Appetize.io. Common issues:
  - API URL not accessible (use a public backend URL, not localhost)
  - Missing permissions in Info.plist
  - Network connectivity issues

### Backend Connection Issues

Since you're testing in a cloud simulator, your backend needs to be publicly accessible:

**Option 1: Use a public backend**
- Deploy backend to Render, Railway, or Heroku (all have free tiers)
- Update `API_BASE_URL` in your app to point to the public URL

**Option 2: Use ngrok (Free)**
- Install ngrok: https://ngrok.com
- Run: `ngrok http 4000`
- Use the ngrok URL in your app (temporary, but works for testing)

**Option 3: Use localtunnel (Free)**
- Install: `npm install -g localtunnel`
- Run: `lt --port 4000`
- Use the provided URL

---

## Cost Summary

| Method | Cost | Limitations |
|--------|------|-------------|
| GitHub Actions (Public Repo) | **FREE** | Unlimited builds |
| GitHub Actions (Private Repo) | **FREE** | 2000 min/month |
| Appetize.io | **FREE** | 100 min/month |
| BrowserStack Trial | **FREE** | One-time 100 min |
| Codemagic (Flutter) | **FREE** | 500 min/month |
| Physical iPhone + AltStore | **FREE** | Weekly refresh needed |

**Recommended Combo**: GitHub Actions (free) + Appetize.io (100 free min/month) = **Completely Free iOS Testing!**

---

## Next Steps

1. ✅ Push your code to GitHub
2. ✅ Wait for GitHub Actions to build
3. ✅ Download the iOS app artifact
4. ✅ Upload to Appetize.io
5. ✅ Start testing!

If you need help with any step, let me know!


