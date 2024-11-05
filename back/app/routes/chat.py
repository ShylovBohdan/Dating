from fastapi import APIRouter, Depends, HTTPException
from bson import ObjectId
from datetime import datetime

from fastapi.security import OAuth2PasswordBearer

from app.models.chat import Chat
from app.models.message import Message
from app.schemas.chat import CreateChatRequest, SendMessage

chat_router = APIRouter(prefix="/chats")


@chat_router.get("/user/{user_id}", response_model=list[Chat])
async def get_user_chats(user_id: str):
    chats = await Chat.find({"$or": [
        {"user1_id": user_id},
        {"user2_id": user_id}
    ]}).to_list()
    print(chats)
    return chats
    
@chat_router.get("/{user_id}", response_model=Chat)
async def get_chat(user_id: str):
    chat = await Chat.find_one({"$or": [
        {"user1_id": user_id},
        {"user2_id": user_id}
    ]})
    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")
    return chat

@chat_router.post("/{chat_id}/messages", response_model=Message)
async def send_message(chat_id: str, message: SendMessage):
    chat = await Chat.find_one({"_id": ObjectId(chat_id)})
    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")

    new_message = Message(
        chat_id=str(chat.id),
        sender_id=message.sender_id,
        content=message.content,
        timestamp=datetime.now(),
        status="sent"
    )
    print(chat)
    print(chat_id)
    chat.messages.append(new_message)
    await chat.save()
    return new_message

@chat_router.patch("/{chat_id}/messages/{message_id}", response_model=Message)
async def update_message_status(chat_id: str, message_id: str, status: str):
    chat = await Chat.find_one({"_id": ObjectId(chat_id)})
    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")

    message = next((m for m in chat.messages if m.id == ObjectId(message_id)), None)
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")

    message.status = status
    await chat.save()
    return message

@chat_router.post("/create", response_model=Chat)
async def create_chat(chat_request: CreateChatRequest):
    # Створення нового чату
    new_chat = Chat(
        user1_id=chat_request.user1_id,
        user2_id=chat_request.user2_id,
        messages=[]  # Початково чату без повідомлень
    )
    
    # Зберігаємо новий чат у базі даних
    await new_chat.save()
    
    return new_chat