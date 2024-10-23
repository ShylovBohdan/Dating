from pydantic import BaseModel
from datetime import datetime

class ProfileBase(BaseModel):
    created_at: datetime = datetime.now()