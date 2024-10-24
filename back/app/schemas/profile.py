from pydantic import BaseModel

class ProfileGet(BaseModel):
    user_id: str