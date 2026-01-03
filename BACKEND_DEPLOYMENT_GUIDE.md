# Backend Deployment Guide - Get Your Backend URL

## Understanding Your Architecture

Your application has **two parts**:

1. **Frontend (React)** → Deployed on **Netlify**
   - This is what users see (the website)
   - Makes API calls to your backend

2. **Backend (Node.js/Express)** → Needs to be deployed separately
   - This handles AI chatbot requests
   - Calls Google Gemini API
   - **This is what you need to deploy now to get a public URL**

---

## Current Situation

Right now, you're running both locally:
- Frontend: `http://localhost:3000` (React)
- Backend: `http://localhost:3001` (Express server)

**For production, you need:**
- Frontend: `https://your-site.netlify.app` (already deployed ✅)
- Backend: `https://your-backend.railway.app` (needs deployment ⚠️)

---

## Option 1: Deploy Backend to Railway (Easiest - Recommended)

Railway is the easiest way to deploy your Node.js backend. It's free and takes ~5 minutes.

### Step 1: Prepare Your Backend

1. **Create a new folder for backend** (optional, but recommended):
   ```bash
   # In your project root
   mkdir backend
   # Copy server.js and package.json to backend folder
   ```

   OR keep everything in root (simpler for now)

2. **Create `railway.json`** (optional, helps Railway understand your app):
   ```json
   {
     "$schema": "https://railway.app/railway.schema.json",
     "build": {
       "builder": "NIXPACKS"
     },
     "deploy": {
       "startCommand": "node server.js",
       "restartPolicyType": "ON_FAILURE",
       "restartPolicyMaxRetries": 10
     }
   }
   ```

### Step 2: Deploy to Railway

1. **Sign up/Login to Railway**
   - Go to: https://railway.app
   - Sign up with GitHub (free)

2. **Create New Project**
   - Click **"New Project"**
   - Select **"Deploy from GitHub repo"**
   - Choose your portfolio repository

3. **Configure Service**
   - Railway will detect it's a Node.js app
   - It will automatically:
     - Install dependencies (`npm install`)
     - Run `npm start` or detect your start command

4. **Add Environment Variables**
   - In Railway dashboard, go to your service
   - Click **"Variables"** tab
   - Add these variables:
     ```
     GEMINI_API_KEY = AIzaSyCPeACK5_ruMUolYbMgoMJ5e2YaFk6iR00
     NODE_ENV = production
     PORT = 3001 (optional, Railway auto-assigns)
     ```

5. **Get Your Backend URL**
   - Railway will automatically generate a URL
   - Go to **"Settings"** → **"Networking"**
   - You'll see a URL like: `https://your-app-name.up.railway.app`
   - **This is your backend URL!** ✅

6. **Update Your Backend URL**
   - Your backend API endpoint will be: `https://your-app-name.up.railway.app/api/ask`
   - Copy this URL

### Step 3: Update Netlify with Backend URL

1. Go to Netlify Dashboard
2. **Site configuration** → **Environment variables**
3. Add/Update:
   - Key: `REACT_APP_API_URL`
   - Value: `https://your-app-name.up.railway.app/api/ask` (your Railway URL)
4. Trigger a new deploy

---

## Option 2: Deploy Backend to Render (Alternative)

Render is another free option, similar to Railway.

### Step 1: Prepare for Render

1. **Create `render.yaml`** (optional):
   ```yaml
   services:
     - type: web
       name: portfolio-backend
       env: node
       buildCommand: npm install
       startCommand: node server.js
       envVars:
         - key: NODE_ENV
           value: production
         - key: GEMINI_API_KEY
           sync: false
   ```

### Step 2: Deploy to Render

1. **Sign up/Login**
   - Go to: https://render.com
   - Sign up with GitHub

2. **Create New Web Service**
   - Click **"New +"** → **"Web Service"**
   - Connect your GitHub repository
   - Configure:
     - **Name:** `portfolio-backend`
     - **Environment:** `Node`
     - **Build Command:** `npm install`
     - **Start Command:** `node server.js`
     - **Plan:** Free

3. **Add Environment Variables**
   - In service settings, go to **"Environment"**
   - Add:
     ```
     GEMINI_API_KEY = AIzaSyCPeACK5_ruMUolYbMgoMJ5e2YaFk6iR00
     NODE_ENV = production
     ```

4. **Get Your Backend URL**
   - Render will generate: `https://portfolio-backend.onrender.com`
   - Your API endpoint: `https://portfolio-backend.onrender.com/api/ask`
   - **This is your backend URL!** ✅

5. **Update Netlify**
   - Add to Netlify env vars:
     - `REACT_APP_API_URL` = `https://portfolio-backend.onrender.com/api/ask`

---

## Option 3: Use Netlify Functions (Advanced)

If you want everything on Netlify, you can convert your Express backend to Netlify Functions. This is more complex but keeps everything in one place.

**Note:** This requires restructuring your code. Railway/Render is easier.

---

## Quick Start: Railway (Recommended)

### Fastest Path:

1. **Go to Railway.app** → Sign up with GitHub
2. **New Project** → **Deploy from GitHub repo**
3. **Select your portfolio repo**
4. **Add Environment Variable:**
   - `GEMINI_API_KEY` = `AIzaSyCPeACK5_ruMUolYbMgoMJ5e2YaFk6iR00`
5. **Wait for deployment** (~2-3 minutes)
6. **Copy the URL** from Settings → Networking
7. **Add to Netlify:**
   - `REACT_APP_API_URL` = `https://your-railway-url.up.railway.app/api/ask`

**That's it!** Your backend will have a public URL.

---

## Testing Your Backend URL

After deployment, test your backend:

```bash
# Test the health endpoint
curl https://your-backend-url.up.railway.app/health

# Test the API endpoint
curl -X POST https://your-backend-url.up.railway.app/api/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "What skills does Sourav have?"}'
```

If you get a response, your backend is working! ✅

---

## Architecture Diagram

```
User Browser
    ↓
Netlify (Frontend)
    ↓ (API Call)
Railway/Render (Backend)
    ↓ (API Call)
Google Gemini API
```

---

## Troubleshooting

### Backend not deploying?
- Check Railway/Render logs
- Ensure `server.js` is in root or specified correctly
- Verify `package.json` has correct start script

### Backend URL not working?
- Check if backend is running (green status in Railway/Render)
- Verify environment variables are set
- Check backend logs for errors

### CORS errors?
- Your backend already has CORS enabled ✅
- Make sure backend URL in Netlify matches exactly

---

## Summary

**You don't have a backend URL yet because:**
- Your backend is only running locally (`localhost:3001`)
- You need to deploy it to Railway/Render to get a public URL
- Once deployed, you'll get a URL like `https://your-app.railway.app`
- Then use that URL in Netlify: `https://your-app.railway.app/api/ask`

**Next Steps:**
1. Deploy backend to Railway (5 minutes)
2. Get your backend URL
3. Add `REACT_APP_API_URL` to Netlify with that URL
4. Redeploy Netlify
5. Test your chatbot! 🎉

