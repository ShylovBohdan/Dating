from datetime import datetime
from typing import Optional

from beanie import Document
from bson import ObjectId
from pydantic import BaseModel


class Message(Document):
    chat_id: str
    sender_id: str
    content: str
    timestamp: datetime
    status: str  # "sent", "delivered", "read"
    class Settings:
        collection = "messages"
    class Config:
        arbitrary_types_allowed = True