import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { useNavigate, useParams } from "react-router-dom";
import {
  Chat,
  createChat,
  getChat,
  Message,
  sendMessage,
} from "../requests/Chat";
import { v4 as uuidv4 } from "uuid";
import { getId } from "../requests/Auth";

const ChatPage: React.FC = () => {
  const { partnerId } = useParams<{ partnerId: string }>();
  const navigate = useNavigate();
  const [chat, setChat] = useState<Chat | null>(null);

  useEffect(() => {
    const fetchChat = async () => {
      try {
        let chatData = await getChat(partnerId!);
        if (!chatData) {
          // Якщо чата ще не існує, створюємо новий
          chatData = await createChat(partnerId!);
        }
        console.log(chatData);
        setChat(chatData);
      } catch (error) {
        console.error("Error fetching or creating chat:", error);
        navigate("/"); // Переадресовуємо на головну сторінку в разі помилки
      }
    };
    fetchChat();
  }, [partnerId, navigate]);

  const handleSendMessage = async (content: string) => {
    if (!chat) return;
    const newMessage: Message = {
      id: uuidv4(),
      chat_id: chat._id,
      sender_id: getId() || "",
      content,
      timestamp: new Date().toISOString(),
      status: "sent",
    };

    const sentMessage = await sendMessage(chat._id, newMessage);
    setChat((prevChat) => ({
      ...prevChat!,
      messages: [...prevChat!.messages, sentMessage],
    }));
  };

  if (!chat) return <div>Loading...</div>;

  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "80vh",
          overflowY: "auto",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Chat with {partnerId}
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          {chat.messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={{
                sender: message.sender_id,
                content: message.content,
                timestamp: message.timestamp,
              }}
              isCurrentUser={message.sender_id === getId()}
            />
          ))}
        </Box>
        <ChatInput onSendMessage={handleSendMessage} />
      </Box>
    </Box>
  );
};

export default ChatPage;
