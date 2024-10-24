from fastapi import APIRouter, Depends, HTTPException
from app.models.user import User
from app.schemas.admin_create import AdminCreate
from app.services.admin_create_service import create_admin
from app.schemas.user import UserCreate
from app.services.user_service import hash_password
from app.services.jwt_validation_service import RoleChecker

admin_router = APIRouter()

@admin_router.post("/admin/register", dependencies=[Depends(RoleChecker("admin"))])
async def register_admin(user_data: UserCreate):
    existing_user = await User.find_one(User.email == user_data.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = hash_password(user_data.password)
    new_admin = User(
        username=user_data.username,
        email=user_data.email,
        password=hashed_password,
        role="admin"
    )
    await new_admin.insert()
    return {"message": "Admin registered successfully"}