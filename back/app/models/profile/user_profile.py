from typing import Optional

from app.models.profile.profile_base import ProfileBase

class UserProfile(ProfileBase):
    age: Optional[int] = None
    gender: Optional[str] = None
    horoscope: Optional[str] = None
    hobbies: Optional[list[str]] = None