from typing import Optional

from app.models.profile.profile_base import ProfileBase

class UserProfile(ProfileBase):
    age: Optional[int]
    gender: Optional[str]
    horoscope: Optional[str]
    hobbies: Optional[list[str]]