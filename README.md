# 🗣️ Assistive Speech-to-Intent System for Dysarthric Users

[![MVP Status](https://img.shields.io/badge/Status-MVP%20Complete-success)](PROJECT_COMPLETE.md)
[![Backend](https://img.shields.io/badge/Backend-FastAPI-009688)](backend/)
[![Frontend](https://img.shields.io/badge/Frontend-React-61dafb)](frontend/)
[![Documentation](https://img.shields.io/badge/Docs-Complete-blue)](QUICKSTART.md)

A **personalized, safety-first communication system** that enables people with dysarthria or motor speech impairments to reliably communicate essential needs in hospital and care settings.

Instead of attempting unreliable free-form speech recognition, this system uses a **constrained, hierarchical interaction model** that prioritizes clarity, trust, and real-world deployability.

---

## 🚨 Problem Statement

People with dysarthria often:

* Cannot produce intelligible speech
* Are misunderstood by conventional voice assistants
* Struggle to communicate basic needs in critical situations (hospital beds, emergencies)

Traditional **speech-to-text systems fail** because they assume clear articulation and large vocabularies.

---

## 💡 Our Solution (Core Idea)

We reframe the problem from **speech recognition** to **intent selection**.

The system allows users to navigate a small set of critical options using **consistent acoustic patterns**, supported by confirmation and caregiver alerts.

> This is not ASR.
> This is **assistive, personalized communication**.

---

## ✨ MVP Features

### Core Functionality ✅
- **Hierarchical Intent Selection**: Main menu (YES/NO/HELP/EMERGENCY) → Help submenu (1-4)
- **Audio Recording**: 3-second voice capture with MediaRecorder API
- **Intent Classification**: Backend API with confidence scoring
- **Confirmation Flow**: Low-confidence detections require user confirmation
- **Emergency Priority**: Immediate alerts without confirmation delay
- **Personalization**: Onboarding flow to collect user-specific voice samples
- **Visual Feedback**: Clear UI updates for every action

### User Interface 🎨
- **Welcome Screen**: Onboarding or skip to demo mode
- **Main Menu**: Large, color-coded intent cards (YES/NO/HELP/EMERGENCY)
- **Help Submenu**: Numbered options (Water/Food/Washroom/Pain)
- **Confirmation Dialog**: Clear yes/no choices for uncertain detections
- **Emergency Alert**: Full-screen red overlay with animations
- **Responsive Design**: Works on desktop and mobile

### Technical Implementation 🔧
- **Backend**: FastAPI with 8 RESTful endpoints
- **Frontend**: React 18 with component-based architecture
- **Audio Processing**: Feature extraction pipeline
- **State Management**: React hooks for UI state
- **CORS Support**: Frontend-backend integration
- **Error Handling**: Graceful fallbacks throughout

---

## 🧠 Interaction Design (Hierarchical & Constrained)

### Level 1 — Main Menu

The user selects one of four primary intents:

```
YES | NO | HELP | EMERGENCY
```

The user produces *any vocal sound they are comfortable with* → the model classifies the intent.

---

### Level 2 — Help Menu (Contextual Narrowing)

If **HELP** is selected, the system displays numbered options:

```
1 → Water
2 → Food
3 → Washroom
4 → Pain
```

The user only needs to vocalize:

* "one", "two", "three", or "four"
  (or any consistent sound pattern assigned during onboarding)

---

### Emergency Flow (Critical Path)

If **EMERGENCY** is detected:

* Alerts are sent immediately to caregivers/nursing staff
* Visual + audio feedback is shown to the user
* Minimal or no confirmation delay (safety first)

---

## ✅ Why This Works

* **Extremely small vocabulary** (≤ 10 utterances)
* **Hierarchical intent reduction** (fewer classes per decision)
* **Patient-specific personalization**
* **Yes/No confirmation loop** prevents silent failures
* **Human-in-the-loop** design ensures safety and trust

This mirrors how real AAC (Augmentative & Alternative Communication) systems are deployed in clinical environments.

---

## 🧩 System Architecture (High Level)

```
Audio Input (1–3 sec)
      ↓
Preprocessing
      ↓
Speech Encoder (robust to impaired speech)
      ↓
Intent Classifier
      ↓
Confidence Gate
      ↓
UI Action (Menu / Selection / Alert)
      ↓
Confirmation (YES / NO)
      ↓
Continuous Learning
```

---

## 👤 Personalization & Onboarding

Each user goes through a short onboarding session (~15 minutes):

* 3–5 vocal samples per intent
* Any sound pattern the user prefers
* System learns **that user's unique speech signature**

This makes the system:

* Adaptable
* More accurate over time
* Usable even with severe articulation issues

---

## 🔒 Safety & Reliability Principles

* The system **never guesses silently**
* Low confidence → asks the user to repeat
* Every non-emergency action is confirmable
* Emergency intent is isolated and prioritized
* Caregivers remain in control at all times

---

## 📊 Evaluation Metrics (Beyond Accuracy)

We evaluate success using:

* Successful communication rate
* Average retries per intent
* False emergency rate
* Caregiver response time
* User satisfaction & fatigue

Accuracy alone is **not sufficient** in assistive healthcare systems.

---

## ⚠️ Known Limitations

* Not designed for free-form conversation
* Requires short onboarding/training
* Best suited for users who can vocalize minimally
* Not intended for late-stage anarthria (no speech at all)

These limitations are **explicitly acknowledged and designed around**.

---

## 🛣️ Future Roadmap

* Adaptive confidence thresholds
* Multilingual numeric options
* Hybrid fallback to touch / eye-gaze input
* Expansion to additional low-risk intents
* Integration with hospital nurse-call systems

---

## 🌍 Impact

This system aims to:

* Restore basic communication dignity
* Reduce caregiver guesswork
* Improve response times in emergencies
* Provide a realistic, deployable assistive AI solution

---

## 🤝 Responsible AI Commitment

* Human-in-the-loop by design
* Transparent failure handling
* No autonomous medical decisions
* Privacy-first, patient-controlled data

---

## 🏁 Status

🚧 **Active Development**
Built with a focus on real-world feasibility, accessibility, and responsible AI practices.

---

## 📂 Project Structure

```
S-T-I/
├── 📚 Documentation (8 guides)
│   ├── README.md                    # Project overview
│   ├── QUICKSTART.md               # 5-minute setup guide
│   ├── SETUP_GUIDE.md              # Detailed installation
│   ├── MVP_SUMMARY.md              # Feature documentation
│   ├── ARCHITECTURE.md             # System diagrams
│   ├── DEPLOYMENT_CHECKLIST.md     # Production roadmap
│   ├── PROJECT_COMPLETE.md         # Completion summary
│   └── DEVELOPMENT_JOURNAL.md      # Development notes
│
├── 🐍 Backend (FastAPI)
│   ├── app.py                      # Main API application
│   ├── models/
│   │   └── intent_classifier.py   # Intent classification
│   ├── audio/
│   │   └── processor.py            # Audio processing
│   ├── services/
│   │   └── personalization.py     # User personalization
│   ├── test_api.py                 # API testing
│   └── requirements.txt            # Python dependencies
│
├── ⚛️  Frontend (React + Vite)
│   └── frontendsti/
│       └── src/
│           ├── App.jsx             # Root component
│           ├── App.css             # Global styles
│           └── components/         # UI components
│               ├── MainMenu.jsx/css
│               ├── HelpMenu.jsx/css
│               ├── AudioRecorder.jsx/css
│               ├── ConfirmationDialog.jsx/css
│               ├── EmergencyAlert.jsx/css
│               └── OnboardingFlow.jsx/css
│
└── 🔧 Automation
    ├── setup.sh                    # One-time setup
    ├── start-backend.sh            # Backend launcher
    └── start-frontend.sh           # Frontend launcher
```

---

## 🚀 Getting Started

### ⚡ Quick Start (Recommended)

```bash
# One-time setup
./setup.sh

# Terminal 1: Start backend
./start-backend.sh

# Terminal 2: Start frontend
./start-frontend.sh

# Open browser
# → http://localhost:5173
```

### 📚 Complete Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - Get running in 5 minutes
- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Detailed installation guide
- **[MVP_SUMMARY.md](MVP_SUMMARY.md)** - Complete feature list
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System design & diagrams
- **[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)** - Production roadmap
- **[PROJECT_COMPLETE.md](PROJECT_COMPLETE.md)** - Project overview

### 🔗 Quick Links

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

### Prerequisites

* Python 3.8+ (for backend)
* Node.js 16+ (for frontend)
* Microphone access (for audio recording)

---

## 🤝 Contributing

This project is built with a focus on responsible AI and accessibility. Contributions that align with these principles are welcome.

---

## 📄 License

[Add your license here]

---

## 📧 Contact

[Add contact information here]
# S-t-i2
