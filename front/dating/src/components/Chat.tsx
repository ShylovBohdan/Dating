import React from "react";
import { Box, TextField, Button } from "@mui/material";

const Chat: React.FC = () => {
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
        {/* Message List */}
        <Box sx={{ flexGrow: 1 }}>Chat Messages...</Box>
        <Box sx={{ display: "flex", mt: 2 }}>
          <TextField fullWidth placeholder="Type your message..." />
          <Button variant="contained">Send</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
