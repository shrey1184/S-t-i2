import './ConfirmationDialog.css';

function ConfirmationDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="confirmation-overlay">
      <div className="confirmation-dialog">
        <h3>Please Confirm</h3>
        <p className="confirmation-message">{message}</p>
        
        <div className="confirmation-buttons">
          <button 
            className="confirm-button yes"
            onClick={onConfirm}
          >
            ✓ Yes, Correct
          </button>
          
          <button 
            className="confirm-button no"
            onClick={onCancel}
          >
            ✗ No, Try Again
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationDialog;
