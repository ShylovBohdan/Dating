from fastapi import APIRouter
from .user import user_router
from .auth import auth_router

# Єдиний інстанс APIRouter
router = APIRouter()
router.include_router(user_router)
router.include_router(auth_router)