import { useState } from 'react';
import MainMenu from './components/MainMenu';
import HelpMenu from './components/HelpMenu';
import ConfirmationDialog from './components/ConfirmationDialog';
import EmergencyAlert from './components/EmergencyAlert';
import OnboardingFlow from './components/OnboardingFlow';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('main'); // 'main', 'help', 'onboarding'
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [pendingIntent, setPendingIntent] = useState(null);
  const [feedback, setFeedback] = useState('');

  // API base URL
  const API_BASE = 'http://localhost:8000';

  const handleIntentDetected = async (intent, confidence, requiresConfirmation, message) => {
    console.log('Intent detected:', intent, 'Confidence:', confidence);
    
    setFeedback(message);

    // Handle emergency immediately
    if (intent === 'EMERGENCY') {
      await triggerEmergency();
      return;
    }

    // Handle HELP - navigate to help menu
    if (intent === 'HELP') {
      setCurrentView('help');
      return;
    }

    // For YES/NO, show confirmation if needed
    if (requiresConfirmation) {
      setPendingIntent({ intent, message });
      setShowConfirmation(true);
    } else {
      // Direct action for high confidence
      executeFinalAction(intent);
    }
  };

  const handleHelpOptionDetected = async (option, confidence, requiresConfirmation, message) => {
    console.log('Help option detected:', option);
    
    setFeedback(message);

    if (requiresConfirmation) {
      setPendingIntent({ intent: option, message });
      setShowConfirmation(true);
    } else {
      executeFinalAction(option);
    }
  };

  const handleConfirmation = async (confirmed) => {
    setShowConfirmation(false);

    if (confirmed && pendingIntent) {
      try {
        const response = await fetch(`${API_BASE}/api/confirm-intent`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            intent: pendingIntent.intent,
            confirmed: true
          })
        });

        const data = await response.json();
        
        if (data.action_taken) {
          executeFinalAction(pendingIntent.intent);
        }
      } catch (error) {
        console.error('Error confirming intent:', error);
        setFeedback('Error confirming. Please try again.');
      }
    } else {
      setFeedback('Please try again');
      setCurrentView('main');
    }

    setPendingIntent(null);
  };

  const executeFinalAction = (intent) => {
    console.log('Executing action for:', intent);
    
    const actions = {
      'YES': 'Confirmed: YES ✓',
      'NO': 'Confirmed: NO ✗',
      '1': 'Requesting: WATER 💧',
      '2': 'Requesting: FOOD 🍽️',
      '3': 'Requesting: WASHROOM 🚻',
      '4': 'Requesting: PAIN HELP 💊'
    };

    setFeedback(actions[intent] || `Action: ${intent}`);
    
    // Return to main menu after 3 seconds
    setTimeout(() => {
      setCurrentView('main');
      setFeedback('');
    }, 3000);
  };

  const triggerEmergency = async () => {
    setShowEmergency(true);
    
    try {
      const response = await fetch(`${API_BASE}/api/emergency-alert`, {
        method: 'POST'
      });
      
      const data = await response.json();
      console.log('Emergency alert sent:', data);
    } catch (error) {
      console.error('Error sending emergency alert:', error);
    }

    // Hide emergency alert after 5 seconds
    setTimeout(() => {
      setShowEmergency(false);
      setCurrentView('main');
    }, 5000);
  };

  const handleBackToMain = () => {
    setCurrentView('main');
    setFeedback('');
  };

  const handleOnboardingComplete = () => {
    setIsOnboarded(true);
    setCurrentView('main');
    setFeedback('Onboarding complete! 🎉');
  };

  // Show onboarding on first launch
  if (!isOnboarded && currentView !== 'onboarding') {
    return (
      <div className="app">
        <div className="welcome-screen">
          <h1>Welcome to Speech-to-Intent</h1>
          <p>A personalized communication system for users with dysarthria</p>
          <button 
            className="btn btn-primary"
            onClick={() => setCurrentView('onboarding')}
          >
            Start Onboarding
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => setIsOnboarded(true)}
          >
            Skip (Demo Mode)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Speech-to-Intent System</h1>
        {isOnboarded && <span className="status-badge">✓ Personalized</span>}
      </header>

      {feedback && (
        <div className="feedback-banner">
          {feedback}
        </div>
      )}

      <main className="app-main">
        {currentView === 'onboarding' && (
          <OnboardingFlow 
            onComplete={handleOnboardingComplete}
            apiBase={API_BASE}
          />
        )}

        {currentView === 'main' && (
          <MainMenu 
            onIntentDetected={handleIntentDetected}
            apiBase={API_BASE}
          />
        )}

        {currentView === 'help' && (
          <HelpMenu 
            onOptionDetected={handleHelpOptionDetected}
            onBack={handleBackToMain}
            apiBase={API_BASE}
          />
        )}
      </main>

      {showConfirmation && pendingIntent && (
        <ConfirmationDialog 
          message={pendingIntent.message}
          onConfirm={() => handleConfirmation(true)}
          onCancel={() => handleConfirmation(false)}
        />
      )}

      {showEmergency && (
        <EmergencyAlert />
      )}

      <footer className="app-footer">
        <p>🗣️ Speak clearly and at your own pace</p>
      </footer>
    </div>
  );
}

export default App;
