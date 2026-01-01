from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import numpy as np
import io
import logging

# Import our modules
from models.intent_classifier import IntentClassifier
from audio.processor import AudioProcessor
from services.personalization import PersonalizationService

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Speech-to-Intent API", version="1.0.0")

# CORS setup for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
intent_classifier = IntentClassifier()
audio_processor = AudioProcessor()
personalization_service = PersonalizationService()


class IntentResponse(BaseModel):
    intent: str
    confidence: float
    requires_confirmation: bool
    message: str


class ConfirmationRequest(BaseModel):
    intent: str
    confirmed: bool


class OnboardingData(BaseModel):
    user_id: str
    intent: str
    audio_samples: List[str]  # Base64 encoded audio


@app.get("/")
async def root():
    return {
        "message": "Speech-to-Intent API",
        "status": "active",
        "version": "1.0.0"
    }


@app.get("/health")
async def health_check():
    return {"status": "healthy"}


@app.post("/api/classify-intent", response_model=IntentResponse)
async def classify_intent(audio_file: UploadFile = File(...)):
    """
    Classify user intent from audio input.
    Returns intent, confidence, and whether confirmation is needed.
    """
    try:
        # Read audio file
        audio_bytes = await audio_file.read()
        
        # Process audio
        features = audio_processor.process_audio(audio_bytes)
        
        # Classify intent
        intent, confidence = intent_classifier.classify(features)
        
        # Determine if confirmation is needed
        requires_confirmation = confidence < 0.85 and intent != "EMERGENCY"
        
        # Generate response message
        message = _generate_response_message(intent, confidence)
        
        logger.info(f"Intent classified: {intent} (confidence: {confidence:.2f})")
        
        return IntentResponse(
            intent=intent,
            confidence=confidence,
            requires_confirmation=requires_confirmation,
            message=message
        )
        
    except Exception as e:
        logger.error(f"Error classifying intent: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/classify-help-option", response_model=IntentResponse)
async def classify_help_option(audio_file: UploadFile = File(...)):
    """
    Classify help menu option (1-4) from audio input.
    """
    try:
        audio_bytes = await audio_file.read()
        features = audio_processor.process_audio(audio_bytes)
        
        # Classify help option (1-4)
        option, confidence = intent_classifier.classify_help_option(features)
        
        requires_confirmation = confidence < 0.85
        
        option_map = {
            "1": "Water",
            "2": "Food", 
            "3": "Washroom",
            "4": "Pain"
        }
        
        message = f"You selected: {option_map.get(option, 'Unknown')}"
        
        return IntentResponse(
            intent=option,
            confidence=confidence,
            requires_confirmation=requires_confirmation,
            message=message
        )
        
    except Exception as e:
        logger.error(f"Error classifying help option: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/confirm-intent")
async def confirm_intent(confirmation: ConfirmationRequest):
    """
    Handle user confirmation of detected intent.
    """
    try:
        if confirmation.confirmed:
            logger.info(f"Intent confirmed: {confirmation.intent}")
            return {
                "status": "success",
                "message": f"Action confirmed: {confirmation.intent}",
                "action_taken": True
            }
        else:
            logger.info(f"Intent rejected: {confirmation.intent}")
            return {
                "status": "retry",
                "message": "Please try again",
                "action_taken": False
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/emergency-alert")
async def trigger_emergency():
    """
    Handle emergency alert - notifies caregivers immediately.
    """
    try:
        logger.warning("EMERGENCY ALERT TRIGGERED")
        
        # In production: send alerts to caregivers, nurse call system, etc.
        # For MVP: just log and return confirmation
        
        return {
            "status": "emergency_triggered",
            "message": "Emergency alert sent to caregivers",
            "timestamp": "2026-01-02T00:00:00Z",
            "alert_sent": True
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/onboarding/add-sample")
async def add_onboarding_sample(
    user_id: str,
    intent: str,
    audio_file: UploadFile = File(...)
):
    """
    Add training sample during user onboarding.
    """
    try:
        audio_bytes = await audio_file.read()
        features = audio_processor.process_audio(audio_bytes)
        
        # Store sample for personalization
        personalization_service.add_sample(user_id, intent, features)
        
        samples_count = personalization_service.get_sample_count(user_id, intent)
        
        return {
            "status": "sample_added",
            "user_id": user_id,
            "intent": intent,
            "samples_collected": samples_count,
            "samples_needed": 5
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/onboarding/complete")
async def complete_onboarding(user_id: str):
    """
    Complete onboarding and train personalized model.
    """
    try:
        # Train personalized model
        success = personalization_service.train_user_model(user_id)
        
        if success:
            return {
                "status": "onboarding_complete",
                "user_id": user_id,
                "model_trained": True,
                "message": "Your personalized model is ready!"
            }
        else:
            raise HTTPException(
                status_code=400,
                detail="Insufficient samples for training"
            )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


def _generate_response_message(intent: str, confidence: float) -> str:
    """Generate user-friendly response message."""
    messages = {
        "YES": "You said: Yes",
        "NO": "You said: No",
        "HELP": "Opening help menu...",
        "EMERGENCY": "🚨 EMERGENCY - Alerting caregivers now!"
    }
    
    base_message = messages.get(intent, "Intent detected")
    
    if confidence < 0.7:
        return f"{base_message} (Please confirm)"
    
    return base_message


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
