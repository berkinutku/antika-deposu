# Backend Tunneling for iOS Testing

When testing your iOS app in cloud simulators (like Appetize.io), your backend running on `localhost:4000` won't be accessible. You need to make it publicly accessible.

## Option 1: ngrok (Easiest, Free)

### Install ngrok
1. Download from https://ngrok.com/download
2. Extract and add to PATH, or use the executable directly

### Run ngrok
```bash
# In your backend directory
cd backend
npm run dev  # Start your backend on port 4000

# In another terminal, start ngrok
ngrok http 4000
```

You'll get a URL like: `https://abc123.ngrok.io`

### Update Your App
Update `AntikaDeposu/src/api/client.ts`:
```typescript
const API_BASE_URL = 'https://abc123.ngrok.io/api';
```

**Note**: ngrok free tier gives you a random URL that changes each time. For testing, this is fine.

---

## Option 2: localtunnel (Free, No Signup)

### Install localtunnel
```bash
npm install -g localtunnel
```

### Run localtunnel
```bash
# Start your backend first
cd backend
npm run dev

# In another terminal
lt --port 4000
```

You'll get a URL like: `https://random-name.loca.lt`

### Update Your App
```typescript
const API_BASE_URL = 'https://random-name.loca.lt/api';
```

**Note**: localtunnel URLs also change, but you can request a subdomain with `--subdomain` flag (if available).

---

## Option 3: Deploy Backend to Free Hosting (Permanent Solution)

### Render (Free Tier)
1. Go to https://render.com
2. Sign up (free)
3. Create new "Web Service"
4. Connect your GitHub repo
5. Set build command: `cd backend && npm install`
6. Set start command: `cd backend && npm start`
7. Add environment variables (MONGODB_URI, JWT_SECRET)
8. Deploy!

You'll get a permanent URL like: `https://your-app.onrender.com`

### Railway (Free Tier with Credit)
1. Go to https://railway.app
2. Sign up (free $5 credit/month)
3. Deploy from GitHub
4. Add environment variables
5. Get permanent URL

### Fly.io (Free Tier)
1. Go to https://fly.io
2. Sign up (free)
3. Deploy with: `fly launch`
4. Get permanent URL

---

## Option 4: Use MongoDB Atlas (Free) + Deploy Backend

If you're using MongoDB locally, switch to MongoDB Atlas (free tier):

1. Sign up at https://www.mongodb.com/cloud/atlas
2. Create a free cluster (M0 - 512MB, free forever)
3. Get connection string
4. Deploy backend to Render/Railway with Atlas connection string
5. Update app to use deployed backend URL

---

## Quick Setup for Testing

**Fastest way to test right now:**

```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Start ngrok
ngrok http 4000

# Copy the https URL (e.g., https://abc123.ngrok.io)
# Update AntikaDeposu/src/api/client.ts with this URL
# Rebuild your app with GitHub Actions
# Upload to Appetize.io and test!
```

---

## Important Notes

1. **Security**: These tunnels expose your local backend. Only use for testing!
2. **Rate Limits**: Free tiers have rate limits. For production, use proper hosting.
3. **URL Changes**: ngrok/localtunnel URLs change. Update your app each time.
4. **CORS**: Make sure your backend allows CORS from your app's origin.

### Update Backend CORS (if needed)

In `backend/src/index.js`, make sure CORS is configured:

```javascript
const cors = require('cors');
app.use(cors({
  origin: '*', // For testing only! Restrict in production
  credentials: true
}));
```

---

## Recommended for Production

For a real app, deploy your backend to:
- **Render** (free tier, easy setup)
- **Railway** (free credit, good performance)
- **Fly.io** (free tier, global CDN)

Then update your app's API URL to the deployed backend URL.


