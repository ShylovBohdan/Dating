import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <Box sx={{ display: "flex", mt: 2 }}>
      <TextField
        fullWidth
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSendMessage();
          }
        }}
      />
      <Button variant="contained" onClick={handleSendMessage}>
        Send
      </Button>
    </Box>
  );
};

export default ChatInput;
