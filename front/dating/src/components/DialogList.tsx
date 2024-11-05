import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemText, Box, IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config/Api";
import { getId } from "../requests/Auth";

interface Dialog {
  id: string;
  name: string;
}

const DialogList: React.FC = () => {
  const [dialogs, setDialogs] = useState<Dialog[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDialogs = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
          // Handle case where access token is not available
          return;
        }

        const response = await axios.get(`${API_URL}/chats/user/${getId()}`);
        setDialogs(
          response.data.map((chat: { user1_id: string; user2_id: string }) => ({
            id: chat.user1_id === accessToken ? chat.user2_id : chat.user1_id,
            name: chat.user1_id === accessToken ? "User 2" : "User 1",
          }))
        );
      } catch (error) {
        console.error("Error fetching dialogs:", error);
      }
    };
    fetchDialogs();
  }, []);

  const handleChatClick = (partnerId: string) => {
    navigate(`/chat/${partnerId}`);
  };

  return (
    <Box sx={{ p: 2 }}>
      <List>
        {dialogs.map((dialog) => (
          <ListItem
            key={dialog.id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="chat"
                onClick={() => handleChatClick(dialog.id)}
              >
                <ChatIcon />
              </IconButton>
            }
          >
            <ListItemText primary={dialog.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default DialogList;
