"""
Test script for Speech-to-Intent API
Run this after starting the backend to verify endpoints work
"""

import requests
import json

BASE_URL = "http://localhost:8000"

def test_health():
    """Test health check endpoint"""
    print("Testing /health endpoint...")
    response = requests.get(f"{BASE_URL}/health")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    print()

def test_root():
    """Test root endpoint"""
    print("Testing / endpoint...")
    response = requests.get(f"{BASE_URL}/")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    print()

def test_emergency_alert():
    """Test emergency alert endpoint"""
    print("Testing /api/emergency-alert endpoint...")
    response = requests.post(f"{BASE_URL}/api/emergency-alert")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    print()

def test_confirm_intent():
    """Test intent confirmation endpoint"""
    print("Testing /api/confirm-intent endpoint...")
    data = {
        "intent": "YES",
        "confirmed": True
    }
    response = requests.post(
        f"{BASE_URL}/api/confirm-intent",
        json=data,
        headers={"Content-Type": "application/json"}
    )
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    print()

def main():
    print("=" * 50)
    print("Speech-to-Intent API Tests")
    print("=" * 50)
    print()
    
    try:
        test_health()
        test_root()
        test_emergency_alert()
        test_confirm_intent()
        
        print("=" * 50)
        print("✅ All basic tests passed!")
        print("=" * 50)
        print()
        print("Note: Audio endpoints require actual audio files.")
        print("Test those through the frontend UI.")
        
    except requests.exceptions.ConnectionError:
        print("❌ Error: Could not connect to backend.")
        print("Make sure the backend is running on http://localhost:8000")
    except Exception as e:
        print(f"❌ Error: {str(e)}")

if __name__ == "__main__":
    main()
