import numpy as np
import io
import logging

logger = logging.getLogger(__name__)


class AudioProcessor:
    """
    Audio preprocessing and feature extraction.
    For MVP: Basic feature extraction.
    In production: Would use MFCC, mel-spectrogram, or wav2vec features.
    """
    
    def __init__(self, sample_rate: int = 16000):
        self.sample_rate = sample_rate
        self.feature_dim = 128
        
    def process_audio(self, audio_bytes: bytes) -> np.ndarray:
        """
        Process raw audio bytes and extract features.
        
        Args:
            audio_bytes: Raw audio data
            
        Returns:
            Feature vector as numpy array
        """
        try:
            # MVP: Create synthetic features from audio bytes
            # In production: Use librosa, torchaudio, or transformers
            
            # Convert bytes to numeric representation
            audio_array = np.frombuffer(audio_bytes, dtype=np.uint8)
            
            # Simulate feature extraction
            features = self._extract_features(audio_array)
            
            return features
            
        except Exception as e:
            logger.error(f"Error processing audio: {str(e)}")
            # Return zero features as fallback
            return np.zeros(self.feature_dim)
    
    def _extract_features(self, audio_array: np.ndarray) -> np.ndarray:
        """
        Extract audio features.
        
        For MVP: Simple statistical features.
        For production: MFCC, mel-spectrogram, or pre-trained embeddings.
        """
        # Basic statistical features
        if len(audio_array) == 0:
            return np.zeros(self.feature_dim)
        
        # Compute simple features
        features = []
        
        # Mean and std
        features.append(np.mean(audio_array))
        features.append(np.std(audio_array))
        
        # Energy
        features.append(np.sum(audio_array ** 2))
        
        # Zero crossing rate simulation
        features.append(np.mean(np.abs(np.diff(audio_array))))
        
        # Pad to feature_dim
        features = np.array(features)
        padded_features = np.pad(
            features, 
            (0, self.feature_dim - len(features)), 
            mode='constant'
        )
        
        return padded_features
    
    def validate_audio(self, audio_bytes: bytes) -> bool:
        """
        Check if audio data is valid.
        """
        if len(audio_bytes) == 0:
            return False
        
        # Check minimum length (at least 0.5 seconds at 16kHz)
        min_bytes = self.sample_rate * 0.5
        
        return len(audio_bytes) >= min_bytes * 0.1  # Relaxed for MVP
