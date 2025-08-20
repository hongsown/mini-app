#!/bin/bash

# Render start script for backend
echo "🚀 Starting backend deployment process..."

# Run database migration first
echo "📊 Running database migrations..."
npm run migrate

# Check if migration was successful
if [ $? -eq 0 ]; then
    echo "✅ Migration successful"
else
    echo "❌ Migration failed"
    exit 1
fi

# Start the server
echo "🖥️ Starting server..."
npm start