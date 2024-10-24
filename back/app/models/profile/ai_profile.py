
from typing import Optional
from app.models.profile.profile_base import ProfileBase


class AIProfile(ProfileBase):
    version: Optional[str] = None
    server_location: Optional[str] = None
    uptime: Optional[int] = None
    param_count: Optional[int] = None