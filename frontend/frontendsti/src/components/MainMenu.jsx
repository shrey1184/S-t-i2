import { useState, useRef } from 'react';
import AudioRecorder from './AudioRecorder';
import './MainMenu.css';

function MainMenu({ onIntentDetected, apiBase }) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAudioRecorded = async (audioBlob) => {
    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append('audio_file', audioBlob, 'audio.webm');

      const response = await fetch(`${apiBase}/api/classify-intent`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to classify intent');
      }

      const data = await response.json();
      
      onIntentDetected(
        data.intent,
        data.confidence,
        data.requires_confirmation,
        data.message
      );

    } catch (error) {
      console.error('Error classifying intent:', error);
      alert('Error processing audio. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="main-menu">
      <h2>Main Menu</h2>
      <p className="instruction">Speak to select an option</p>

      <div className="intent-grid">
        <div className="intent-card yes-card">
          <span className="intent-icon">✓</span>
          <span className="intent-label">YES</span>
        </div>

        <div className="intent-card no-card">
          <span className="intent-icon">✗</span>
          <span className="intent-label">NO</span>
        </div>

        <div className="intent-card help-card">
          <span className="intent-icon">🆘</span>
          <span className="intent-label">HELP</span>
        </div>

        <div className="intent-card emergency-card">
          <span className="intent-icon">🚨</span>
          <span className="intent-label">EMERGENCY</span>
        </div>
      </div>

      <AudioRecorder
        onAudioRecorded={handleAudioRecorded}
        isProcessing={isProcessing}
        buttonText="Speak Now"
      />

      {isProcessing && (
        <div className="processing-indicator">
          <div className="spinner"></div>
          <p>Processing your speech...</p>
        </div>
      )}
    </div>
  );
}

export default MainMenu;
