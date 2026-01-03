# Netlify Environment Variables Setup Guide

## Overview
Your application needs environment variables to work properly on Netlify. Since you have a backend (Node.js/Express) and frontend (React), you have two deployment options.

---

## Option 1: Deploy Backend Separately (Recommended)

If you deploy your backend to a service like **Railway**, **Render**, or **Heroku**, you only need to add frontend environment variables to Netlify.

### Environment Variables to Add in Netlify:

1. **REACT_APP_API_URL**
   - **Key:** `REACT_APP_API_URL`
   - **Value:** Your backend API URL (e.g., `https://your-backend-app.railway.app/api/ask` or `https://your-backend.onrender.com/api/ask`)
   - **Important:** Must start with `REACT_APP_` to be accessible in React
   - **Scopes:** All scopes (Production, Deploy Previews, Branch Deploys)

2. **NODE_ENV** (Optional, but recommended)
   - **Key:** `NODE_ENV`
   - **Value:** `production`
   - **Scopes:** All scopes

### Backend Environment Variables (Add to your backend hosting service):

If deploying backend separately (Railway/Render/Heroku), add these there:

1. **GEMINI_API_KEY**
   - **Key:** `GEMINI_API_KEY`
   - **Value:** `AIzaSyCPeACK5_ruMUolYbMgoMJ5e2YaFk6iR00` (your actual API key)
   - **Important:** Mark as "Secret" or "Sensitive"

2. **PORT** (Optional)
   - **Key:** `PORT`
   - **Value:** `3001` (or let the service assign automatically)
   - **Note:** Most hosting services auto-assign ports

3. **NODE_ENV**
   - **Key:** `NODE_ENV`
   - **Value:** `production`

---

## Option 2: Use Netlify Functions (Advanced)

If you want everything on Netlify, you'll need to convert your Express backend to Netlify Functions. This is more complex but keeps everything in one place.

---

## Step-by-Step: Adding Variables to Netlify

### For Frontend (Netlify Dashboard):

1. **Go to Netlify Dashboard**
   - Navigate to your site: `https://app.netlify.com/sites/YOUR_SITE_NAME`

2. **Open Environment Variables**
   - Click **"Site configuration"** → **"Environment variables"**
   - Or go directly: `https://app.netlify.com/sites/YOUR_SITE_NAME/configuration/env`

3. **Add REACT_APP_API_URL**
   - Click **"Add a variable"**
   - **Key:** `REACT_APP_API_URL`
   - **Value:** Your backend URL (e.g., `https://your-backend.railway.app/api/ask`)
   - **Scopes:** Select "All scopes" (or specific if needed)
   - Click **"Create variable"**

4. **Add NODE_ENV** (Optional)
   - Click **"Add a variable"** again
   - **Key:** `NODE_ENV`
   - **Value:** `production`
   - **Scopes:** All scopes
   - Click **"Create variable"**

5. **Redeploy**
   - After adding variables, trigger a new deploy
   - Go to **"Deploys"** tab → Click **"Trigger deploy"** → **"Clear cache and deploy site"**

---

## Important Notes:

### ⚠️ Security:
- **Never commit `.env` file to GitHub** ✅ (You've already done this correctly!)
- **Never add `GEMINI_API_KEY` to Netlify** if you're deploying backend separately
- Only add `GEMINI_API_KEY` to your backend hosting service

### 🔑 REACT_APP_ Prefix:
- Environment variables in React must start with `REACT_APP_` to be accessible
- `REACT_APP_API_URL` will be available as `process.env.REACT_APP_API_URL` in your React code

### 🌐 Backend URL:
- If deploying backend separately, use the full URL:
  - ✅ `https://your-backend.railway.app/api/ask`
  - ✅ `https://your-backend.onrender.com/api/ask`
  - ❌ `http://localhost:3001/api/ask` (won't work in production!)

### 🔄 After Adding Variables:
- Netlify will automatically use these variables in new builds
- You may need to trigger a new deploy for changes to take effect
- Variables are available during build time and runtime

---

## Quick Checklist:

### Netlify (Frontend):
- [ ] Add `REACT_APP_API_URL` with your backend URL
- [ ] Add `NODE_ENV=production` (optional)
- [ ] Trigger a new deploy

### Backend Hosting (Railway/Render/Heroku):
- [ ] Add `GEMINI_API_KEY` with your API key
- [ ] Add `NODE_ENV=production` (optional)
- [ ] Add `PORT` if needed (usually auto-assigned)

---

## Testing:

After deployment, test your chatbot:
1. Open your deployed Netlify site
2. Click the chatbot button
3. Ask a question
4. Check browser console for any errors
5. Verify API calls are going to the correct backend URL

---

## Troubleshooting:

### Issue: Chatbot not working
- Check browser console for errors
- Verify `REACT_APP_API_URL` is set correctly in Netlify
- Ensure backend is deployed and accessible
- Check backend logs for API errors

### Issue: "API key not valid"
- Verify `GEMINI_API_KEY` is set in backend hosting service
- Check API key is correct (no typos)
- Ensure backend can access environment variables

### Issue: CORS errors
- Backend should have CORS enabled (already in your code ✅)
- Verify backend URL is correct

---

## Example Netlify Environment Variables:

```
REACT_APP_API_URL = https://your-backend.railway.app/api/ask
NODE_ENV = production
```

---

## Example Backend Environment Variables (Railway/Render):

```
GEMINI_API_KEY = AIzaSyCPeACK5_ruMUolYbMgoMJ5e2YaFk6iR00
NODE_ENV = production
PORT = 3001 (optional, usually auto-assigned)
```

