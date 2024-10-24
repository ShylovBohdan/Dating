from typing import Optional
from beanie import Document
from bson import ObjectId

from app.models.profile.ai_profile import AIProfile
from app.models.profile.user_profile import UserProfile

class Profile(Document):
    profile_type: str  # Може бути "user" або "ai"
    user_profile: Optional[UserProfile] = None
    ai_profile: Optional[AIProfile] = None

    class Settings:
        collection = "profiles"
    class Config:
        json_encoders = {
            ObjectId: str
        }
    def save_profile(self):
        """Перевіряємо, що або `user_profile`, або `ai_profile` встановлені, але не обидва"""
        if self.user_profile and self.ai_profile:
            raise ValueError("Profile cannot have both user and AI profiles at the same time")
        if not self.user_profile and not self.ai_profile:
            raise ValueError("Profile must have either user or AI profile")
    def get_profile(self):
        if(self.profile_type=="user"):
            return self.user_profile
        return self.ai_profile