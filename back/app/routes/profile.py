from fastapi import APIRouter, HTTPException
from app.models.profile.user_profile import UserProfile
from app.models.user import User
from app.schemas.profile import ProfileGet


profile_router = APIRouter()

@profile_router.post("/{user_id}", response_model=UserProfile)
async def get_user_profile(request: ProfileGet):
    user = await User.get(request.user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user.profile