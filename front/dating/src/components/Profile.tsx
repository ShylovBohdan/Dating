import React from "react";
import { Box, Typography, Avatar, Grid, Paper, Button } from "@mui/material";

interface ProfileProps {
  isAI: boolean; // Для адаптивності
  user: {
    avatar: string;
    zodiac: string;
    birthdate: string;
    gender: string;
    preferences: string;
  };
  onLogout: () => void; // Додаємо функцію виходу через пропси
}

const Profile: React.FC<ProfileProps> = ({ isAI, user, onLogout }) => {
  return (
    <Box sx={{ p: 4 }}>
      <Paper
        elevation={3}
        sx={{ padding: 4, borderRadius: "10px", border: "1px solid #00FFDD" }}
      >
        <Grid container spacing={4}>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Avatar
              alt="User Avatar"
              src={user.avatar}
              sx={{ width: 128, height: 128 }}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h6">Zodiac: {user.zodiac}</Typography>
            <Typography variant="body1">Birthdate: {user.birthdate}</Typography>
            <Typography variant="body1">Gender: {user.gender}</Typography>
            <Typography variant="body1">
              Preferences: {user.preferences}
            </Typography>
          </Grid>
        </Grid>
        {/* Додаємо кнопку виходу */}
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Button
            variant="contained"
            color="error"
            onClick={onLogout}
            sx={{ width: "50%" }}
          >
            Вийти
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile;
