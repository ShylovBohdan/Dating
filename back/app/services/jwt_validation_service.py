from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from app.models.user import User
from app.services.jwt_service import ALGORITHM, SECRET_KEY

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        user = await User.get(user_id)
        return user
    except JWTError:
        raise HTTPException(status_code=403, detail="Could not validate credentials")

class RoleChecker:
    def __init__(self, required_role: str):
        self.required_role = required_role

    async def __call__(self, current_user: User = Depends(get_current_user)):
        if current_user.role != self.required_role:
            raise HTTPException(status_code=403, detail="Not enough permissions")