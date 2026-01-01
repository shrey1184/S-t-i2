import { useEffect, useState } from 'react';
import './EmergencyAlert.css';

function EmergencyAlert() {
  const [flash, setFlash] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlash(prev => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`emergency-overlay ${flash ? 'flash' : ''}`}>
      <div className="emergency-alert">
        <div className="emergency-icon">🚨</div>
        <h2>EMERGENCY ALERT</h2>
        <p>Caregivers have been notified</p>
        <p className="help-coming">Help is on the way</p>
        
        <div className="alert-animation">
          <div className="pulse-ring"></div>
          <div className="pulse-ring delay-1"></div>
          <div className="pulse-ring delay-2"></div>
        </div>
      </div>
    </div>
  );
}

export default EmergencyAlert;
