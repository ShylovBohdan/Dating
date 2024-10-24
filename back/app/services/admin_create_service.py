from app.models.user import User
from app.services.user_service import hash_password


async def create_admin(name: str, email: str, password: str):
    hashed_password = hash_password(password)
    admin = User(name=name, email=email, password=hashed_password, role="admin")
    await admin.insert()