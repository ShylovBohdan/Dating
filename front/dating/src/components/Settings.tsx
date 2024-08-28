import React from "react";
import { Box, Button, TextField } from "@mui/material";

const Settings: React.FC = () => {
  const [email, setEmail] = React.useState("");

  const handleSave = () => {
    console.log("Settings saved:", { email });
  };

  return (
    <Box sx={{ p: 2 }}>
      <TextField
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Change your email"
        sx={{ mb: 2 }}
      />
      <Button variant="contained" onClick={handleSave}>
        Save Settings
      </Button>
    </Box>
  );
};

export default Settings;
