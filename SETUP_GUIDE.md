# 🚀 Speech-to-Intent System - Setup & Run Guide

## Overview

This MVP implements a personalized speech-to-intent system for dysarthric users, featuring:

- **Backend**: FastAPI with intent classification and audio processing
- **Frontend**: React with real-time audio recording and hierarchical UI
- **Features**: Main menu (YES/NO/HELP/EMERGENCY), Help submenu, Confirmation flows, Onboarding

---

## 🛠️ Prerequisites

- **Python 3.8+** (for backend)
- **Node.js 16+** (for frontend)
- **npm** or **yarn**
- **Microphone access** (for audio recording)

---

## 📦 Installation

### Quick Setup (Automated)

```bash
# Make setup script executable
chmod +x setup.sh

# Run setup
./setup.sh
```

### Manual Setup

#### Backend Setup

```bash
cd backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

#### Frontend Setup

```bash
cd frontend/frontendsti

# Install dependencies
npm install
```

---

## 🚀 Running the Application

### Option 1: Using Scripts

```bash
# Terminal 1 - Start Backend
chmod +x start-backend.sh
./start-backend.sh

# Terminal 2 - Start Frontend
chmod +x start-frontend.sh
./start-frontend.sh
```

### Option 2: Manual Start

#### Start Backend

```bash
cd backend
source venv/bin/activate
python app.py
```

Backend will run on: **http://localhost:8000**

API docs available at: **http://localhost:8000/docs**

#### Start Frontend

```bash
cd frontend/frontendsti
npm run dev
```

Frontend will run on: **http://localhost:5173**

---

## 🎯 Using the Application

### 1. First Launch - Onboarding

- Click **"Start Onboarding"** to personalize the system
- Record 3 samples for each intent (YES, NO, HELP, EMERGENCY)
- Use any consistent sound pattern you're comfortable with
- Or click **"Skip (Demo Mode)"** to try without personalization

### 2. Main Menu

Four primary intents:
- **YES** ✓ - Affirmative response
- **NO** ✗ - Negative response
- **HELP** 🆘 - Access help menu
- **EMERGENCY** 🚨 - Immediate alert

Click **"Speak Now"** and speak your intent within 3 seconds.

### 3. Help Menu

Four assistance options:
1. **Water** 💧
2. **Food** 🍽️
3. **Washroom** 🚻
4. **Pain** 💊

Say the number (1-4) of what you need.

### 4. Confirmation Flow

- Low confidence detections require confirmation
- Click **"Yes, Correct"** to confirm
- Click **"No, Try Again"** to retry

### 5. Emergency Alert

- Triggers immediate caregiver notification
- Visual and audio feedback
- No confirmation delay for safety

---

## 📁 Project Structure

```
S-T-I/
├── backend/
│   ├── app.py                 # FastAPI application
│   ├── models/
│   │   └── intent_classifier.py  # Intent classification logic
│   ├── audio/
│   │   └── processor.py       # Audio processing
│   ├── services/
│   │   └── personalization.py # User personalization
│   └── requirements.txt       # Python dependencies
│
├── frontend/frontendsti/
│   ├── src/
│   │   ├── App.jsx           # Main application
│   │   ├── components/
│   │   │   ├── MainMenu.jsx
│   │   │   ├── HelpMenu.jsx
│   │   │   ├── AudioRecorder.jsx
│   │   │   ├── ConfirmationDialog.jsx
│   │   │   ├── EmergencyAlert.jsx
│   │   │   └── OnboardingFlow.jsx
│   │   └── *.css             # Component styles
│   └── package.json          # Node dependencies
│
├── setup.sh                  # Automated setup
├── start-backend.sh          # Backend launcher
├── start-frontend.sh         # Frontend launcher
└── README.md                 # Project documentation
```

---

## 🔌 API Endpoints

### Backend API (Port 8000)

- `GET /` - API info
- `GET /health` - Health check
- `POST /api/classify-intent` - Classify main menu intent
- `POST /api/classify-help-option` - Classify help menu option
- `POST /api/confirm-intent` - Confirm detected intent
- `POST /api/emergency-alert` - Trigger emergency
- `POST /api/onboarding/add-sample` - Add training sample
- `POST /api/onboarding/complete` - Complete onboarding

Full API documentation: **http://localhost:8000/docs**

---

## 🧪 Testing

### Test Backend

```bash
# Check health
curl http://localhost:8000/health

# View API docs
open http://localhost:8000/docs
```

### Test Frontend

1. Open http://localhost:5173
2. Grant microphone permissions when prompted
3. Test recording by clicking "Speak Now"
4. Verify audio is captured (3-second limit)

---

## 🔧 Configuration

### Backend Configuration

Edit `backend/app.py`:

```python
# CORS origins
allow_origins=["http://localhost:5173", "http://localhost:3000"]

# Confidence threshold
confidence_threshold = 0.85
```

### Frontend Configuration

Edit `frontend/frontendsti/src/App.jsx`:

```javascript
// API base URL
const API_BASE = 'http://localhost:8000';
```

---

## 📝 MVP Limitations & Future Work

### Current MVP Features

✅ Hierarchical intent selection (YES/NO/HELP/EMERGENCY)
✅ Audio recording (3-second limit)
✅ Confidence-based confirmation
✅ Emergency alert flow
✅ Onboarding/personalization interface
✅ Responsive UI design

### Known Limitations

⚠️ Simulated ML model (random classification for demo)
⚠️ In-memory storage (no database persistence)
⚠️ No actual audio feature extraction
⚠️ No real caregiver notification system

### Production Requirements

🔜 Real ML model training (CNN/Transformer)
🔜 Database integration (PostgreSQL/MongoDB)
🔜 Audio feature extraction (MFCC, wav2vec)
🔜 Caregiver notification system
🔜 User authentication
🔜 Mobile app support
🔜 Accessibility enhancements

---

## 🐛 Troubleshooting

### Backend Issues

**Port 8000 already in use:**
```bash
# Find process using port 8000
lsof -i :8000

# Kill process
kill -9 <PID>
```

**Import errors:**
```bash
# Ensure virtual environment is activated
source venv/bin/activate

# Reinstall dependencies
pip install -r requirements.txt
```

### Frontend Issues

**Port 5173 already in use:**
```bash
# Kill process on port 5173
lsof -i :5173
kill -9 <PID>
```

**Microphone not working:**
- Check browser permissions (Chrome/Firefox)
- Ensure HTTPS or localhost (required for MediaRecorder API)
- Try different browser

**CORS errors:**
- Verify backend is running
- Check API_BASE URL in App.jsx
- Ensure backend CORS settings include frontend URL

---

## 🤝 Contributing

This MVP focuses on responsible AI and accessibility. Key principles:

- Human-in-the-loop by design
- Transparent failure handling
- Privacy-first approach
- No autonomous medical decisions

---

## 📄 License

[Add your license]

---

## 📧 Support

For issues or questions:
- Check API docs: http://localhost:8000/docs
- Review browser console for errors
- Verify microphone permissions

---

## 🎉 Next Steps

1. Test the MVP workflow end-to-end
2. Collect user feedback
3. Integrate real ML model
4. Add database persistence
5. Implement caregiver notification system
6. Deploy to production environment

---

**Built with ❤️ focusing on accessibility and responsible AI**
