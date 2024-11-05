import datetime
from typing import List

from beanie import Document
from bson import ObjectId
from app.models.message import Message


class Chat(Document):
    user1_id: str
    user2_id: str
    messages: List[Message]

    class Settings:
        collection = "chats"

    # class Config:
    #     json_encoders = {
    #         ObjectId: str,
    #         datetime: lambda dt: dt.isoformat()
    #     }

    async def send_message(self, sender_id: str, content: str):
        message = Message(
            chat_id=self.id,
            sender_id=sender_id,
            content=content,
            timestamp=datetime.now(),
            status="sent"
        )
        self.messages.append(message)
        await self.save()
        return message

    async def update_message_status(self, message_id: str, status: str):
        message = next((m for m in self.messages if m.id == ObjectId(message_id)), None)
        if message:
            message.status = status
            await self.save()