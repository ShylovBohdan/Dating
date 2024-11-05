import datetime
from typing import List
from bson import ObjectId
from pydantic import BaseModel


class SendMessage(BaseModel):
    id: str
    sender_id: str
    content: str
    timestamp: datetime.datetime
    status: str  # "sent", "delivered", "read"

class SendChat(BaseModel):
    id: str
    user1_id: str
    user2_id: str
    messages: List[SendMessage]
class CreateChatRequest(BaseModel):
    user1_id: str
    user2_id: str