from app.models.user import User
from passlib.context import CryptContext

from app.models.profile.profile import Profile
from app.models.profile.user_profile import UserProfile

# Налаштування для хешування паролів
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

async def create_user(name: str, email: str, password: str, age: int, gender: str, horoscope: str, hobbies: list[str]):
    hashed_password = hash_password(password)
    user_profile = UserProfile(age=age, gender=gender, horoscope=horoscope, hobbies=hobbies)
    profile = Profile(profile_type="user", user_profile=user_profile)
    profile.save_profile()
    user = User(username=name, email=email, hashed_password=hashed_password, profile=profile, role="user")
    await user.insert()
    return user