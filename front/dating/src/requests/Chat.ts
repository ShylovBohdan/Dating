import axios from "axios";
import { API_URL } from "../config/Api";
import { jwtDecode } from "jwt-decode";
import { DecodedIdToken } from "./Auth";

export interface Message {
  id: string;
  chat_id: string;
  sender_id: string;
  content: string;
  timestamp: string;
  status: string;
}

export interface Chat {
  _id: string;
  user1_id: string;
  user2_id: string;
  messages: Message[];
}

export const getChat = async (chatId: string): Promise<Chat | null> => {
  try {
    const response = await axios.get<Chat>(`${API_URL}/chats/${chatId}`);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const sendMessage = async (
  chatId: string,
  message: Message
): Promise<Message> => {
  const response = await axios.post<Message>(
    `${API_URL}/chats/${chatId}/messages`,
    message
  );
  return response.data;
};
export const createChat = async (partnerId: string): Promise<Chat> => {
  const jwt = localStorage.getItem("access_token");
  const decodedId: DecodedIdToken = jwtDecode(jwt || "");
  const id = decodedId.user_id;
  try {
    const response = await axios.post<Chat>(`${API_URL}/chats/create`, {
      user1_id: id, // Змінити на id поточного користувача
      user2_id: partnerId,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating chat:", error);
    throw error; // Пробрасываем ошибку для обработки на уровне вызова
  }
};
