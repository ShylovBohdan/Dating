from fastapi import APIRouter, HTTPException
from app.models.profile.user_profile import UserProfile
from app.models.user import User
from app.schemas.profile import ProfileGet


profile_router = APIRouter()

@profile_router.post("/{user_id}", response_model=UserProfile)
async def get_user_profile(request: ProfileGet):
    user = await User.get(request.user_id)
    print(user.profile)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user.profile.get_profile()
# @profile_router.put("/{user_id}", response_model=UserProfile)
# async def update_user_profile(user_id: str, profile_data: UserProfileUpdate):
#     user = await User.get(user_id)
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")
#     user.profile.user_profile.update(profile_data.dict(exclude_unset=True))
#     await user.profile.save_profile()
#     await user.save()
#     return user.profile.user_profile