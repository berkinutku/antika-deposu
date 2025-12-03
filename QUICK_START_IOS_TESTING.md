# Quick Start: Free iOS Testing on Windows

## 🚀 3-Step Process (Takes ~15 minutes)

### Step 1: Push to GitHub (2 minutes)
```bash
git add .
git commit -m "Add iOS build workflow"
git push origin main
```

**Important**: Make your repository **public** to get unlimited free GitHub Actions minutes!

### Step 2: Wait for Build (5-10 minutes)
1. Go to your GitHub repo
2. Click "Actions" tab
3. Wait for the workflow to complete (green checkmark)
4. Download the `ios-app-build` artifact

### Step 3: Test on Appetize.io (3 minutes)
1. Go to https://appetize.io
2. Sign up (free - 100 minutes/month)
3. Upload the `.app` file from the downloaded artifact
4. Start testing in browser!

---

## 📋 What You Need

- ✅ GitHub account (free)
- ✅ Appetize.io account (free)
- ✅ Your backend running (see BACKEND_TUNNELING.md for making it accessible)

---

## 🔧 Backend Setup (Required)

Your backend needs to be accessible from the cloud simulator:

**Quick Option**: Use ngrok (free)
```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Start ngrok
ngrok http 4000

# Copy the https URL and update AntikaDeposu/src/api/client.ts
```

See `BACKEND_TUNNELING.md` for more options.

---

## 📚 Full Guides

- **Detailed Guide**: See `FREE_IOS_TESTING_GUIDE.md`
- **Backend Tunneling**: See `BACKEND_TUNNELING.md`
- **General Testing**: See `TESTING_GUIDE.md`

---

## 💡 Pro Tips

1. **Public Repo = Unlimited Builds**: Make your GitHub repo public for unlimited free builds
2. **Save Appetize Minutes**: Only upload new builds when you make changes
3. **Use ngrok for Quick Tests**: Perfect for development, use proper hosting for production
4. **Check Build Logs**: If build fails, check GitHub Actions logs for errors

---

## ❓ Troubleshooting

**Build fails?**
- Check GitHub Actions logs
- Make sure `ios/Podfile` is correct
- Verify Node version matches (workflow uses Node 20)

**App won't connect to backend?**
- Make sure backend is publicly accessible (use ngrok)
- Update `API_BASE_URL` in `AntikaDeposu/src/api/client.ts`
- Check CORS settings in backend

**Appetize.io upload fails?**
- Make sure you're uploading the `.app` file (extract from zip first)
- Check file size (free tier has limits)

---

## 🎉 That's It!

You now have a **completely free** way to test iOS apps on Windows!

**Total Cost: $0.00** 💰


