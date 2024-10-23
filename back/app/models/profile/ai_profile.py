
from app.models.profile.profile_base import ProfileBase


class AIProfile(ProfileBase):
    version: str
    server_location: str
    uptime: int 
    param_count: int