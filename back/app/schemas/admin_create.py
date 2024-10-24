from pydantic import BaseModel, EmailStr
from typing import Optional

class AdminCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: Optional[str] = "admin" 

    class Config:
        schema_extra = {
            "example": {
                "name": "Admin User",
                "email": "admin@example.com",
                "password": "strongpassword123",
                "role": "admin"
            }
        }