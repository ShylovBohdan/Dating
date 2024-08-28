import React from "react";
import { List, ListItem, ListItemText, Box, IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";

const DialogList: React.FC = () => {
  const dialogs = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane AI" },
  ];

  return (
    <Box sx={{ p: 2 }}>
      <List>
        {dialogs.map((dialog) => (
          <ListItem
            key={dialog.id}
            secondaryAction={
              <IconButton edge="end" aria-label="chat">
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
