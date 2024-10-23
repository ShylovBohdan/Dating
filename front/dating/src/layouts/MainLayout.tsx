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

interface MainLayoutProps {
  children: ReactNode;
  updateAuthenticationState: (authenticated: boolean) => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  updateAuthenticationState,
}) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // Редирект на сторінку входу після логауту
  };
  const onLogout = () => {
    handleLogout();
    updateAuthenticationState(false); // Оновлюємо стан після логауту
  };
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Tabs sx={{ flexGrow: 1 }}>
            <Tab label="Home" component={Link} to="/home" />
            <Tab label="Dialogs" component={Link} to="/dialogs" />
            <Tab label="Search" component={Link} to="/search" />
            <Tab label="Settings" component={Link} to="/settings" />
            <Tab label="Chat" component={Link} to="/chat" />
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
