import React from "react";
import { Box, Typography, Avatar, Grid, Paper, Button } from "@mui/material";
import { useUserStore } from "../store/UserStore";

const Profile: React.FC = () => {
  const onLogout = useUserStore.getState().signOut;
  const profile = useUserStore.getState().userProfile;
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
            {/* <Avatar
              alt="User Avatar"
              src={profile.avatar}
              sx={{ width: 128, height: 128 }}
            /> */}
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h6">
              Horoscope: {profile?.horoscope}
            </Typography>
            <Typography variant="body1">Age: {profile?.age}</Typography>
            <Typography variant="body1">Gender: {profile?.gender}</Typography>
            <Typography variant="body1">Hobbies: {profile?.hobbies}</Typography>
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
