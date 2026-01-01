import { useState } from 'react';
import AudioRecorder from './AudioRecorder';
import './OnboardingFlow.css';

function OnboardingFlow({ onComplete, apiBase }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentIntent, setCurrentIntent] = useState('YES');
  const [samplesCollected, setSamplesCollected] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [userId] = useState(() => `user_${Date.now()}`);

  const intents = ['YES', 'NO', 'HELP', 'EMERGENCY'];
  const samplesNeeded = 3;

  const handleAudioRecorded = async (audioBlob) => {
    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append('audio_file', audioBlob, 'audio.webm');

      const response = await fetch(
        `${apiBase}/api/onboarding/add-sample?user_id=${userId}&intent=${currentIntent}`,
        {
          method: 'POST',
          body: formData
        }
      );

      if (!response.ok) {
        throw new Error('Failed to add sample');
      }

      const data = await response.json();
      
      // Update samples collected
      setSamplesCollected(prev => ({
        ...prev,
        [currentIntent]: data.samples_collected
      }));

      // Check if we need more samples for this intent
      if (data.samples_collected >= samplesNeeded) {
        // Move to next intent
        const nextStep = currentStep + 1;
        if (nextStep < intents.length) {
          setCurrentStep(nextStep);
          setCurrentIntent(intents[nextStep]);
        } else {
          // Onboarding complete
          await completeOnboarding();
        }
      }

    } catch (error) {
      console.error('Error adding sample:', error);
      alert('Error recording sample. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const completeOnboarding = async () => {
    try {
      const response = await fetch(
        `${apiBase}/api/onboarding/complete?user_id=${userId}`,
        {
          method: 'POST'
        }
      );

      if (!response.ok) {
        throw new Error('Failed to complete onboarding');
      }

      const data = await response.json();
      console.log('Onboarding complete:', data);
      
      onComplete();
    } catch (error) {
      console.error('Error completing onboarding:', error);
      alert('Error completing onboarding. Please try again.');
    }
  };

  const progress = ((currentStep + 1) / intents.length) * 100;
  const currentSamples = samplesCollected[currentIntent] || 0;

  return (
    <div className="onboarding-flow">
      <h2>Personalization Setup</h2>
      <p className="onboarding-description">
        We'll learn your unique voice patterns. Say the same phrase {samplesNeeded} times for each command.
      </p>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="onboarding-step">
        <h3>Step {currentStep + 1} of {intents.length}</h3>
        
        <div className="intent-to-train">
          <span className="intent-label-large">{currentIntent}</span>
        </div>

        <div className="sample-progress">
          <p>Samples recorded: {currentSamples} / {samplesNeeded}</p>
          <div className="sample-dots">
            {[...Array(samplesNeeded)].map((_, i) => (
              <span 
                key={i} 
                className={`sample-dot ${i < currentSamples ? 'collected' : ''}`}
              />
            ))}
          </div>
        </div>

        <div className="onboarding-instruction">
          <p>Say "{currentIntent}" in your natural voice, or use any consistent sound pattern</p>
        </div>

        <AudioRecorder
          onAudioRecorded={handleAudioRecorded}
          isProcessing={isProcessing}
          buttonText={`Record "${currentIntent}"`}
        />
      </div>

      <div className="onboarding-tips">
        <h4>Tips:</h4>
        <ul>
          <li>Use any sound pattern you're comfortable with</li>
          <li>Be consistent with each recording</li>
          <li>Take your time between recordings</li>
        </ul>
      </div>
    </div>
  );
}

export default OnboardingFlow;
