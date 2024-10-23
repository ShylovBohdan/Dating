from pydantic import BaseModel, EmailStr, Field
from typing import Optional, Dict
from bson import ObjectId
from beanie import Document, Link

from app.models.profile.profile import Profile

class UserCreate(Document):
    name: str = Field(..., example="John Doe")
    email: EmailStr = Field(..., example="johndoe@example.com")
    password: str = Field(..., min_length=6, example="password123")
    role: str = "user" 
    settings: Optional[Dict[str, str]] = {}
    profile: Optional[Link[Profile]]

    class Settings:
        collection = "users"  # Назва колекції

    class Config:
        json_encoders = {
            ObjectId: str
        }