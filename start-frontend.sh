#!/bin/bash

# Start Frontend Development Server

echo "🚀 Starting Frontend Server..."

cd frontend/frontendsti

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "❌ node_modules not found. Please run setup.sh first."
    exit 1
fi

# Start development server
echo "Starting React development server..."
npm run dev
