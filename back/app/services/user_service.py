from app.models.user import User
from passlib.context import CryptContext

from app.models.profile.profile import Profile
from app.models.profile.user_profile import UserProfile

# Налаштування для хешування паролів
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

async def create_user(name: str, email: str, password: str,role:str):
    hashed_password = hash_password(password)
    user_profile = UserProfile(age=None, gender=None, horoscope=None, hobbies=[])
    profile = Profile(profile_type="user", user_profile=user_profile)
    
    # Перевірка перед збереженням профілю
    profile.save_profile()
    user = User(username=name, email=email, hashed_password=hashed_password, profile=profile,role=role)
    await user.insert()
    return user