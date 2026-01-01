# ⚡ Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Setup (First Time Only)

```bash
chmod +x setup.sh
./setup.sh
```

### 2. Run Backend

```bash
./start-backend.sh
```

Wait for: `Uvicorn running on http://0.0.0.0:8000`

### 3. Run Frontend (New Terminal)

```bash
./start-frontend.sh
```

Open: **http://localhost:5173**

---

## 🎯 Using the App

### First Time
1. Click **"Start Onboarding"** or **"Skip (Demo Mode)"**
2. Grant microphone permission when prompted

### Main Menu
- Click **"Speak Now"**
- Speak within 3 seconds
- Choose: YES / NO / HELP / EMERGENCY

### Help Menu
- Say number 1-4:
  - 1 = Water
  - 2 = Food
  - 3 = Washroom
  - 4 = Pain

### Confirmation
- If low confidence, confirm or retry
- High confidence = direct action

---

## 🔗 Important URLs

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

---

## 🐛 Quick Troubleshooting

### Backend won't start
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

### Frontend won't start
```bash
cd frontend/frontendsti
npm install
npm run dev
```

### Microphone not working
- Check browser permissions (🔒 icon in URL bar)
- Use Chrome or Firefox
- Ensure you're on localhost or HTTPS

### Port already in use
```bash
# Kill process on port
lsof -i :8000  # or :5173
kill -9 <PID>
```

---

## 📊 Architecture Overview

```
┌─────────────────────────────────────┐
│         React Frontend              │
│  (Audio Recording + UI)             │
│  Port: 5173                         │
└──────────────┬──────────────────────┘
               │ HTTP/JSON
               ↓
┌─────────────────────────────────────┐
│       FastAPI Backend               │
│  (Intent Classification)            │
│  Port: 8000                         │
└─────────────────────────────────────┘
```

---

## 📁 Project Structure

```
S-T-I/
├── backend/          # FastAPI server
│   ├── app.py
│   ├── models/
│   ├── audio/
│   └── services/
├── frontend/         # React app
│   └── frontendsti/
│       └── src/
│           ├── App.jsx
│           └── components/
├── setup.sh          # Setup script
├── start-backend.sh  # Backend launcher
└── start-frontend.sh # Frontend launcher
```

---

## 🎨 UI Components

- **MainMenu**: 4 intent cards (YES/NO/HELP/EMERGENCY)
- **HelpMenu**: 4 numbered options (Water/Food/Washroom/Pain)
- **AudioRecorder**: Record button with 3-sec limit
- **ConfirmationDialog**: Yes/No confirmation popup
- **EmergencyAlert**: Red flashing emergency screen
- **OnboardingFlow**: Sample collection wizard

---

## 🔧 Configuration

### Backend (`backend/app.py`)
```python
# Port
uvicorn.run(app, host="0.0.0.0", port=8000)

# CORS
allow_origins=["http://localhost:5173"]
```

### Frontend (`src/App.jsx`)
```javascript
// API URL
const API_BASE = 'http://localhost:8000';
```

---

## ✅ Testing

### Test Backend
```bash
cd backend
source venv/bin/activate
python test_api.py
```

### Test Frontend
1. Open http://localhost:5173
2. Click "Speak Now"
3. Grant microphone access
4. Speak for 1-3 seconds
5. Verify audio captured

---

## 📚 Documentation

- **Full Setup**: `SETUP_GUIDE.md`
- **MVP Details**: `MVP_SUMMARY.md`
- **API Docs**: http://localhost:8000/docs

---

## 🎯 Demo Flow

1. **Welcome** → Skip or Onboard
2. **Main Menu** → Record audio
3. **Classification** → Intent detected
4. **Confirmation** → If low confidence
5. **Action** → Final result displayed
6. **Help Flow** → HELP → 1-4 selection
7. **Emergency** → Immediate alert

---

## 💡 Tips

- Recording auto-stops after 3 seconds
- Emergency bypasses confirmation
- Low confidence (<85%) requires confirmation
- Onboarding needs 3 samples per intent
- Use headphones to avoid echo

---

## 🚨 Common Issues

| Issue | Solution |
|-------|----------|
| CORS error | Check backend is running |
| 404 error | Verify API_BASE URL |
| No audio | Check microphone permissions |
| Port conflict | Kill process: `lsof -i :PORT` |
| Import error | Activate venv: `source venv/bin/activate` |

---

## 📞 Need Help?

1. Check browser console (F12)
2. Check backend logs
3. Review `SETUP_GUIDE.md`
4. View API docs: http://localhost:8000/docs

---

**Built with ❤️ for accessibility**

---

## 🎉 You're Ready!

Run `./start-backend.sh` and `./start-frontend.sh` to begin!
