#!/bin/bash

# Speech-to-Intent System - Complete Setup Script

echo "🚀 Setting up Speech-to-Intent System..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Backend Setup
echo -e "${BLUE}📦 Setting up Backend...${NC}"
cd backend

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install dependencies
echo "Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

echo -e "${GREEN}✓ Backend setup complete${NC}"
echo ""

# Frontend Setup
echo -e "${BLUE}📦 Setting up Frontend...${NC}"
cd ../frontend/frontendsti

# Install dependencies
echo "Installing Node dependencies..."
npm install

echo -e "${GREEN}✓ Frontend setup complete${NC}"
echo ""

# Return to root
cd ../..

echo ""
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo ""
echo "To run the application:"
echo ""
echo "Terminal 1 (Backend):"
echo "  cd backend"
echo "  source venv/bin/activate"
echo "  python app.py"
echo ""
echo "Terminal 2 (Frontend):"
echo "  cd frontend/frontendsti"
echo "  npm run dev"
echo ""
echo "Then open http://localhost:5173 in your browser"
echo ""
