# 🚀 Quick Start: Test on Appetize.io (5 Minutes)

## Step 1: Push to GitHub (1 min)
```bash
git add .
git commit -m "Ready for Appetize.io testing"
git push origin main
```

**Make repo PUBLIC** for unlimited free builds!

## Step 2: Get Build from GitHub Actions (3-5 min)
1. Go to: `https://github.com/YOUR_USERNAME/YOUR_REPO/actions`
2. Wait for green checkmark ✅
3. Click on the workflow run
4. Scroll down → Download `ios-app-build.zip`
5. Extract → Find `AntikaDeposu.app`

## Step 3: Setup Backend (2 min)
```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Start ngrok
ngrok http 4000
# Copy the https URL (e.g., https://abc123.ngrok.io)
```

**Update API URL:**
Edit `AntikaDeposu/src/api/client.ts`:
```typescript
const API_BASE_URL = 'https://abc123.ngrok.io/api';  // Your ngrok URL
```

**Rebuild** (push again to trigger GitHub Actions)

## Step 4: Upload to Appetize.io (1 min)
1. Go to: https://appetize.io
2. Sign up (free)
3. Click "Upload" → Select `AntikaDeposu.app`
4. Wait 1-2 minutes
5. Click "Launch" → Test! 🎉

---

## ⚠️ Important Notes

- **ngrok URL changes** each time you restart it
- **Update API URL** and rebuild before each test
- **100 free minutes/month** on Appetize.io
- **Public repo** = unlimited GitHub Actions builds

---

## 📚 Full Guide

See `APPETIZE_TESTING_GUIDE.md` for detailed instructions and troubleshooting.


