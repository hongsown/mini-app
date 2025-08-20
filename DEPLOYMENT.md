# 🚀 Deployment Guide - Render

## Overview
This guide walks you through deploying the 123 Fakturera Mini-App to Render with PostgreSQL database.

## Prerequisites
- [Render Account](https://render.com) (free tier available)
- Git repository (GitHub, GitLab, or Bitbucket)
- Basic understanding of environment variables

## 📋 Deployment Steps

### 1. Prepare Your Repository
```bash
# Ensure all files are committed
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### 2. Create Render Services

#### Option A: Using render.yaml (Recommended)
1. Push your code to GitHub/GitLab
2. Go to [Render Dashboard](https://dashboard.render.com)
3. Click "New" → "Blueprint"
4. Connect your repository
5. Render will automatically detect `render.yaml` and create all services

#### Option B: Manual Setup
1. **Create Database First:**
   - Dashboard → "New" → "PostgreSQL"
   - Name: `miniapp-db`
   - Plan: Free
   - Database Name: `miniapp`
   - User: `miniapp_user`

2. **Create Backend Service:**
   - Dashboard → "New" → "Web Service"
   - Connect your repository
   - Name: `miniapp-backend`
   - Runtime: Node
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm run migrate && npm start`
   - Plan: Free

3. **Create Frontend Service:**
   - Dashboard → "New" → "Static Site"
   - Connect your repository
   - Name: `miniapp-frontend`
   - Build Command: `cd frontend && npm install && npm run build`
   - Publish Directory: `frontend/dist`

### 3. Configure Environment Variables

#### Backend Environment Variables:
```env
NODE_ENV=production
PORT=10000
DATABASE_URL=[Auto-filled by Render from database]
```

#### Frontend Environment Variables:
```env
VITE_API_URL=https://your-backend-service.onrender.com/api
```

### 4. Database Migration
The migration runs automatically during backend startup via:
```bash
npm run migrate && npm start
```

## 🔧 Configuration Files

### `render.yaml`
Defines all services and their relationships. Already configured for:
- PostgreSQL database (free tier)
- Backend web service
- Frontend static site
- Environment variable connections

### Environment Variables
- Backend: Uses `DATABASE_URL` provided by Render
- Frontend: Uses `VITE_API_URL` to connect to backend
- SSL is automatically configured for production

## 🚀 Deployment Process

1. **Automatic Deployment:**
   - Push to main branch triggers auto-deployment
   - Backend and frontend deploy simultaneously
   - Database migration runs on backend startup

2. **Manual Deployment:**
   - Use Render dashboard to trigger manual deploys
   - Useful for debugging or rollbacks

## 📊 Monitoring

### Health Checks
- Backend: `https://your-backend.onrender.com/health`
- Frontend: Automatically monitored by Render

### Logs
- View logs in Render dashboard
- Backend logs include database connection status
- Frontend build logs show Vite compilation

## 🛠 Troubleshooting

### Common Issues:

1. **Database Connection Errors:**
   ```bash
   # Check environment variables in Render dashboard
   # Ensure DATABASE_URL is properly set
   ```

2. **CORS Issues:**
   ```javascript
   // Backend already configured for CORS
   // Ensure frontend VITE_API_URL points to correct backend URL
   ```

3. **Build Failures:**
   ```bash
   # Check build logs in Render dashboard
   # Ensure all dependencies are in package.json
   ```

4. **Migration Errors:**
   ```bash
   # Check backend logs
   # Ensure database is created and accessible
   ```

### Debug Commands:
```bash
# Local testing with production-like environment
NODE_ENV=production npm start

# Test migration locally
npm run migrate

# Check build output
cd frontend && npm run build
```

## 🔒 Security Notes

- Environment variables are encrypted at rest
- SSL/TLS is automatically configured
- Database connections use SSL in production
- No sensitive data in source code

## 📈 Scaling

### Free Tier Limitations:
- Backend: Sleeps after 15 minutes of inactivity
- Database: 1GB storage, 1 month retention
- Frontend: Unlimited bandwidth

### Upgrade Options:
- Paid plans offer always-on services
- Larger database storage
- Custom domains
- Advanced monitoring

## 🎯 Production URLs

After deployment, your services will be available at:
- **Frontend:** `https://miniapp-frontend.onrender.com`
- **Backend API:** `https://miniapp-backend.onrender.com/api`
- **Health Check:** `https://miniapp-backend.onrender.com/health`

## 📞 Support

- [Render Documentation](https://render.com/docs)
- [Render Community](https://community.render.com)
- Check deployment logs for specific error messages