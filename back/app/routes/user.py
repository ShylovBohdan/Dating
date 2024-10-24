from typing import List

from fastapi import APIRouter, HTTPException
from app.models.user import User

user_router = APIRouter(prefix="/user")

@user_router.get("/{user_id}", response_model=User)
async def get_user(user_id: str):
    user = await User.get(user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@user_router.get("/", response_model=List[User])
async def get_all_users():
    try:
        users = await User.find_all().to_list()  # Асинхронний пошук усіх користувачів
        if not users:
            raise HTTPException(status_code=404, detail="No users found")
        return users
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))