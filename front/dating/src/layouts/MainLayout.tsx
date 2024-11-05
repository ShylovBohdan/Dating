import React, { ReactNode } from "react";
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  IconButton,
  Avatar,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../store/UserStore";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
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
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Tabs sx={{ flexGrow: 1 }}>
            <Tab label="Home" component={Link} to="/home" />
            <Tab label="Dialogs" component={Link} to="/dialogs" />
            <Tab label="Search" component={Link} to="/search" />
            <Tab label="Serf" component={Link} to="/serf" />
            <Tab label="Settings" component={Link} to="/settings" />
            {/* <Tab label="Chat" component={Link} to="/chat" /> */}
          </Tabs>
          <IconButton component={Link} to="/profile">
            <Avatar alt="User Avatar" src="/path-to-avatar.jpg" />
          </IconButton>
          {/* Додаємо кнопку Logout */}
          <Button color="inherit" onClick={onLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <main>{children}</main>
    </>
  );
};

export default MainLayout;
