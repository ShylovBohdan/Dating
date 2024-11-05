import React, { useEffect } from "react";
import { Box, Typography, Avatar, Grid, Paper, Button } from "@mui/material";
import { useUserStore } from "../store/UserStore";
import axios from "axios";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { getProfile, getProfileFromJwt } from "../requests/Auth";
import { useNavigate } from "react-router-dom";

interface JWTPayload {
  user_id: string;
  // додайте інші поля, які є у вашому JWT
}

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/"); // Редирект на сторінку входу після логауту
  };
  const logout = useUserStore.getState().signOut;
  const onLogout = () => {
    handleLogout();
    logout();
  };
  const { userProfile } = useUserStore.getState();
  getProfileFromJwt();
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
              src={"path/to/default/avatar.jpg"} // Використовуємо стандартну картинку, якщо аватар не заданий
              sx={{ width: 128, height: 128 }}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h6">
              Horoscope: {userProfile?.horoscope}
            </Typography>
            <Typography variant="body1">Age: {userProfile?.age}</Typography>
            <Typography variant="body1">
              Gender: {userProfile?.gender}
            </Typography>
            <Typography variant="body1">
              Hobbies: {userProfile?.hobbies}
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
