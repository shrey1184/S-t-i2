#!/bin/bash

# Start Backend Server

echo "🚀 Starting Backend Server..."

cd backend

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "❌ Virtual environment not found. Please run setup.sh first."
    exit 1
fi

# Activate virtual environment
source venv/bin/activate

# Start server
echo "Starting FastAPI server on http://localhost:8000"
python app.py
