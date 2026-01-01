import { useState } from 'react';
import AudioRecorder from './AudioRecorder';
import './HelpMenu.css';

function HelpMenu({ onOptionDetected, onBack, apiBase }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const helpOptions = [
    { id: '1', label: 'Water', icon: '💧' },
    { id: '2', label: 'Food', icon: '🍽️' },
    { id: '3', label: 'Washroom', icon: '🚻' },
    { id: '4', label: 'Pain', icon: '💊' }
  ];

  const handleAudioRecorded = async (audioBlob) => {
    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append('audio_file', audioBlob, 'audio.webm');

      const response = await fetch(`${apiBase}/api/classify-help-option`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to classify help option');
      }

      const data = await response.json();
      
      onOptionDetected(
        data.intent,
        data.confidence,
        data.requires_confirmation,
        data.message
      );

    } catch (error) {
      console.error('Error classifying help option:', error);
      alert('Error processing audio. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="help-menu">
      <h2>Help Menu</h2>
      <p className="instruction">Say the number of what you need</p>

      <div className="help-options">
        {helpOptions.map(option => (
          <div key={option.id} className="help-option-card">
            <span className="option-number">{option.id}</span>
            <span className="option-icon">{option.icon}</span>
            <span className="option-label">{option.label}</span>
          </div>
        ))}
      </div>

      <AudioRecorder
        onAudioRecorded={handleAudioRecorded}
        isProcessing={isProcessing}
        buttonText="Speak Option Number"
      />

      <button className="back-button" onClick={onBack}>
        ← Back to Main Menu
      </button>

      {isProcessing && (
        <div className="processing-indicator">
          <div className="spinner"></div>
          <p>Processing your speech...</p>
        </div>
      )}
    </div>
  );
}

export default HelpMenu;
