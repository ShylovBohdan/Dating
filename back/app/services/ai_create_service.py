from app.models.user import User

from app.models.profile.ai_profile import AIProfile
from app.models.profile.profile import Profile
from app.services.user_service import hash_password

async def create_ai_user(name: str, email: str, password: str):
    hashed_password = hash_password(password)
    ai_profile = AIProfile(version="1.0", server_location="EU", uptime=10000, param_count=5)
    profile = Profile(profile_type="ai", ai_profile=ai_profile)
    
    # Перевірка перед збереженням профілю
    profile.save_profile()

    await profile.insert()  # Створюємо профіль
    user = User(name=name, email=email, password=hashed_password, profile=profile)
    await user.insert()  # Зберігаємо користувача в базі