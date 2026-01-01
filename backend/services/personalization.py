import numpy as np
from typing import Dict, List
import logging

logger = logging.getLogger(__name__)


class PersonalizationService:
    """
    Handle user-specific personalization and model adaptation.
    Stores user samples and trains personalized models.
    """
    
    def __init__(self):
        # In-memory storage for MVP
        # In production: Use database
        self.user_samples: Dict[str, Dict[str, List[np.ndarray]]] = {}
        self.user_models: Dict[str, object] = {}
        self.min_samples_per_intent = 3
        
    def add_sample(self, user_id: str, intent: str, features: np.ndarray):
        """
        Add a training sample for a user.
        
        Args:
            user_id: User identifier
            intent: Intent label (YES, NO, HELP, etc.)
            features: Audio feature vector
        """
        if user_id not in self.user_samples:
            self.user_samples[user_id] = {}
        
        if intent not in self.user_samples[user_id]:
            self.user_samples[user_id][intent] = []
        
        self.user_samples[user_id][intent].append(features)
        
        logger.info(f"Added sample for user {user_id}, intent {intent}")
    
    def get_sample_count(self, user_id: str, intent: str) -> int:
        """Get number of samples collected for a user and intent."""
        if user_id not in self.user_samples:
            return 0
        if intent not in self.user_samples[user_id]:
            return 0
        return len(self.user_samples[user_id][intent])
    
    def train_user_model(self, user_id: str) -> bool:
        """
        Train a personalized model for the user.
        
        Args:
            user_id: User identifier
            
        Returns:
            True if training successful, False otherwise
        """
        if user_id not in self.user_samples:
            logger.error(f"No samples found for user {user_id}")
            return False
        
        # Check if we have enough samples
        user_data = self.user_samples[user_id]
        for intent, samples in user_data.items():
            if len(samples) < self.min_samples_per_intent:
                logger.error(
                    f"Insufficient samples for intent {intent}: "
                    f"{len(samples)}/{self.min_samples_per_intent}"
                )
                return False
        
        # MVP: Simulate model training
        # In production: Fine-tune ML model on user samples
        logger.info(f"Training personalized model for user {user_id}")
        
        # Store "trained" model
        self.user_models[user_id] = {
            "trained": True,
            "intents": list(user_data.keys()),
            "sample_count": sum(len(samples) for samples in user_data.values())
        }
        
        return True
    
    def get_user_model(self, user_id: str):
        """Get the personalized model for a user."""
        return self.user_models.get(user_id)
    
    def is_onboarded(self, user_id: str) -> bool:
        """Check if user has completed onboarding."""
        return user_id in self.user_models
