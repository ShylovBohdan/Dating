from fastapi import APIRouter, HTTPException
from app.models.user import User

from app.routes import router
from app.schemas.admin_create import AdminCreate
from app.services.admin_create_service import create_admin

@router.post("/create-admin", response_model=User)
async def register_admin(admin: AdminCreate):
    existing_user = await User.find_one(User.email == admin.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    await create_admin(name=admin.name, email=admin.email, password=admin.password)
    return {"message": "Admin created successfully"}