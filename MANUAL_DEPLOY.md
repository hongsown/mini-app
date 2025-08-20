# 🚀 Manual Deployment Guide - Render (Free Tier)

## ⚠️ Important Notes
- Blueprint requires payment card, so we'll deploy manually
- Deploy services in this order: Database → Backend → Frontend

## 🗄️ Step 1: Create PostgreSQL Database

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"PostgreSQL"**
3. Configure:
   - **Name**: `miniapp-db`
   - **Database**: `miniapp`
   - **User**: `miniapp_user`
   - **Region**: Choose closest to you
   - **PostgreSQL Version**: 15 (default)
   - **Plan**: **Free** (1GB, 90 days retention)
4. Click **"Create Database"**
5. **Save the connection details** (you'll need them for backend)

---

## 🔧 Step 2: Deploy Backend Service

### 2.1 Create Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your Git repository
3. Configure:
   - **Name**: `miniapp-backend`
   - **Environment**: **Node**
   - **Region**: Same as database
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm run migrate && npm start`
   - **Plan**: **Free**

### 2.2 Environment Variables
Add these in the Environment section:
```
NODE_ENV=production
DATABASE_URL=[Copy from your database's External Database URL]
```

### 2.3 Advanced Settings
- **Health Check Path**: `/health`
- **Auto-Deploy**: Yes

---

## 🎨 Step 3: Deploy Frontend Service

### 3.1 Create Static Site
1. Click **"New +"** → **"Static Site"**
2. Connect your Git repository
3. Configure:
   - **Name**: `miniapp-frontend`
   - **Branch**: `main`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

### 3.2 Environment Variables
Add this in the Environment section:
```
VITE_API_URL=https://miniapp-backend.onrender.com/api
```
*(Replace `miniapp-backend` with your actual backend service name)*

---

## 🐛 Common Build Issues & Fixes

### Issue 1: "cd backend" command not found
**Problem**: Build commands with `cd` don't work in Render
**Solution**: Use "Root Directory" setting instead

### Issue 2: Frontend can't connect to backend
**Problem**: CORS or wrong API URL
**Solution**: 
1. Check backend logs for CORS errors
2. Verify `VITE_API_URL` is correct
3. Ensure backend health check is working

### Issue 3: Database connection fails
**Problem**: Wrong DATABASE_URL or SSL issues
**Solution**:
1. Copy exact DATABASE_URL from database dashboard
2. Our config already handles SSL for production

### Issue 4: Migration fails
**Problem**: Database not ready or migration script error
**Solution**:
1. Wait for database to be fully ready
2. Check backend logs for specific errors
3. May need to run migration separately first time

---

## 📋 Deployment Checklist

### Before Deploying:
- [ ] Git repository is public or connected to Render
- [ ] All code is pushed to main branch
- [ ] Database is created and running
- [ ] You have DATABASE_URL ready

### Database:
- [ ] PostgreSQL database created
- [ ] Status shows "Available"
- [ ] Connection info copied

### Backend:
- [ ] Web service created with Node environment
- [ ] Root directory set to "backend"
- [ ] DATABASE_URL environment variable added
- [ ] Health check path set to "/health"
- [ ] Build and deploy successful

### Frontend:
- [ ] Static site created
- [ ] Root directory set to "frontend"
- [ ] VITE_API_URL environment variable added
- [ ] Build successful and site accessible

---

## 🔍 Monitoring & Debugging

### Check Service Status:
1. **Backend**: Visit `https://your-backend.onrender.com/health`
2. **Frontend**: Visit your frontend URL
3. **Database**: Check connection from backend logs

### View Logs:
- Click on service name → "Logs" tab
- Look for errors during build or runtime
- Backend logs show database connection status

### Common Success Indicators:
- Backend health check returns status: "healthy"
- Frontend loads without console errors
- API calls from frontend work correctly

---

## 🎯 Expected URLs

After successful deployment:
- **Frontend**: `https://miniapp-frontend.onrender.com`
- **Backend API**: `https://miniapp-backend.onrender.com/api`
- **Health Check**: `https://miniapp-backend.onrender.com/health`
- **Database**: Internal connection only

---

## 💡 Tips for Free Tier

1. **Services sleep after 15 minutes** of inactivity
2. **Cold starts** take 30-60 seconds to wake up
3. **Database has 90-day retention** on free tier
4. **Deploy during low-traffic times** for faster builds
5. **Monitor build minutes** (750 hours/month limit)

---

## 🆘 If Something Goes Wrong

1. **Check build logs** for specific error messages
2. **Verify file paths** - Render builds from root, not subdirectories
3. **Test locally first** with same environment variables
4. **Database connection issues**: Wait a few minutes and retry
5. **Contact Render support** if persistent issues