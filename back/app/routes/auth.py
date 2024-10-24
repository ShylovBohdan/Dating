from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import EmailStr
from app.models.user import User
from app.services.jwt_service import ACCESS_TOKEN_EXPIRE_MINUTES, create_access_token, create_refresh_token
from app.services.user_service import create_user, hash_password
from app.schemas.user import LoginUser, UserCreate

auth_router = APIRouter()

@auth_router.post("/register")
async def register_user(user_data: UserCreate):
    existing_user = await User.find_one(User.email == user_data.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = await create_user(user_data.name,user_data.email,user_data.password,'user')
    access_token = create_access_token(data={"user_id": str(new_user.id),"role":str(new_user.role)}, expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    refresh_token = create_refresh_token(data={"user_id": str(new_user.id)})

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }

@auth_router.post("/login")
async def login(data: LoginUser ):
    user = await User.find_one(User.email == data.email)
    if not user:
        raise HTTPException(status_code=400, detail="User not found")
    if not user.verify_password(data.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    # Створюємо access та refresh токени
    access_token = create_access_token(data={"user_id": str(user.id),"role":str(user.role)}, expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    refresh_token = create_refresh_token(data={"user_id": str(user.id)})

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }