from fastapi import APIRouter
from .user import user_router
from .auth import auth_router
from .admin import admin_router
from .ai import ai_router
from .profile import profile_router

# Єдиний інстанс APIRouter
router = APIRouter()
router.include_router(user_router)
router.include_router(auth_router)
router.include_router(admin_router)
router.include_router(ai_router)
router.include_router(profile_router)