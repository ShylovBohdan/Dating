from typing import Optional
from beanie import Document
from bson import ObjectId
from pydantic import EmailStr
from passlib.context import CryptContext
from datetime import datetime, timezone

from app.models.profile.profile import Profile

# Налаштування контексту для хешування паролів
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class User(Document):
    username: str
    email: EmailStr
    role: str
    hashed_password: str 
    created_at: datetime = datetime.now(timezone.utc)
    profile: Optional[Profile] = None

    class Settings:
        collection = "user"

    class Config:
        json_encoders = {
            ObjectId: str
        }

    # Метод для перевірки пароля
    def verify_password(self, password: str):
        return pwd_context.verify(password, self.hashed_password)
