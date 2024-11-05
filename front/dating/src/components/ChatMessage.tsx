import React from "react";
import { Box, Typography } from "@mui/material";

interface ChatMessageProps {
  message: {
    sender: string;
    content: string;
    timestamp: string;
  };
  isCurrentUser: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isCurrentUser,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isCurrentUser ? "row-reverse" : "row",
        mb: 2,
      }}
    >
      <Box
        sx={{
          backgroundColor: isCurrentUser ? "primary.main" : "grey.200",
          color: isCurrentUser ? "common.white" : "common.black",
          p: 2,
          borderRadius: 2,
        }}
      >
        <Typography variant="body1">{message.content}</Typography>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          {message.timestamp}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatMessage;
