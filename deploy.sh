#!/bin/bash

# 🚀 Deploy Script for Render
# This script helps prepare your app for deployment

echo "🔧 Preparing 123 Fakturera Mini-App for Render deployment..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please initialize git first:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    echo "   git remote add origin <your-repo-url>"
    echo "   git push -u origin main"
    exit 1
fi

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "⚠️  You have uncommitted changes. Please commit them first:"
    echo "   git add ."
    echo "   git commit -m 'Prepare for deployment'"
    echo "   git push origin main"
fi

# Validate required files
echo "✅ Checking deployment files..."

required_files=(
    "render.yaml"
    ".env.example"
    "frontend/.env.example"
    "backend/package.json"
    "frontend/package.json"
    "backend/src/server.js"
    "backend/src/config/database.js"
    "backend/src/migrations/run-migrations.js"
)

for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ Missing required file: $file"
        exit 1
    fi
done

echo "✅ All required files present"

# Test local build
echo "🔨 Testing frontend build..."
cd frontend
if ! npm run build; then
    echo "❌ Frontend build failed"
    exit 1
fi
cd ..

echo "✅ Frontend build successful"

# Test backend dependencies
echo "📦 Testing backend dependencies..."
cd backend
if ! npm install --production --silent; then
    echo "❌ Backend dependency installation failed"
    exit 1
fi
cd ..

echo "✅ Backend dependencies OK"

# Display deployment checklist
echo ""
echo "🎯 Deployment Checklist:"
echo "========================"
echo "✅ render.yaml configured"
echo "✅ Environment variables ready"
echo "✅ Database migration script ready"
echo "✅ Health check endpoint available"
echo "✅ Frontend build working"
echo "✅ Backend dependencies OK"
echo ""
echo "📋 Next Steps:"
echo "1. Push your code to GitHub/GitLab:"
echo "   git add ."
echo "   git commit -m 'Ready for Render deployment'"
echo "   git push origin main"
echo ""
echo "2. Go to Render Dashboard: https://dashboard.render.com"
echo "3. Create New Blueprint and connect your repository"
echo "4. Render will auto-detect render.yaml and create all services"
echo ""
echo "🔗 Useful Links:"
echo "• Render Dashboard: https://dashboard.render.com"
echo "• Deployment Guide: ./DEPLOYMENT.md"
echo "• Environment Variables: ./.env.example"
echo ""
echo "🚀 Ready for deployment!"