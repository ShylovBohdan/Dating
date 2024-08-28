import React, { ReactNode } from "react";
import { AppBar, Toolbar, Tabs, Tab, IconButton, Avatar } from "@mui/material";
import { Link } from "react-router-dom";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
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
        </Toolbar>
      </AppBar>
      <main>{children}</main>
    </>
  );
};

export default MainLayout;
