from beanie import Document
from pydantic import EmailStr
from passlib.context import CryptContext
from datetime import datetime

# Налаштування контексту для хешування паролів
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class User(Document):
    username: str
    email: EmailStr
    hashed_password: str  # Використовуємо хешований пароль
    created_at: datetime = datetime.utcnow()

    class Settings:
        collection = "user"

    class Config:
        json_encoders = {
            ObjectId: str
        }

    # Метод для встановлення хешованого пароля
    def set_password(self, password: str):
        self.hashed_password = pwd_context.hash(password)

    # Метод для перевірки пароля
    def verify_password(self, password: str):
        return pwd_context.verify(password, self.hashed_password)
