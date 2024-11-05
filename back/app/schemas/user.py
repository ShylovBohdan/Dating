from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    age: int
    gender: str
    horoscope: str
    hobbies: list[str]
class LoginUser(BaseModel):
    email: str
    password: str