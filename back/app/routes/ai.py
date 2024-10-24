from fastapi import APIRouter, HTTPException
from app.schemas.user import UserCreate
from app.models.user import User
from app.services.ai_create_service import create_ai_user

ai_router = APIRouter()


@ai_router.post("/register-ai", response_model=User)
async def register_ai_user(user: UserCreate):
    existing_user = await User.find_one(User.email == user.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    await create_ai_user(name=user.name, email=user.email, password=user.password)
    return {"message": "AI User registered successfully"}