from fastapi import APIRouter, HTTPException
from app.models.user import User
from app.schemas.user import UserCreate
from app.services.user_service import create_user

auth_router = APIRouter(prefix="/auth")

@auth_router.post("/register", response_model=User)
async def register_user(user: UserCreate):
    existing_user = await User.find_one(User.email == user.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    await create_user(name=user.name, email=user.email, password=user.password)
    return {"message": "User registered successfully"}