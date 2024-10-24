import React, { useEffect, useState } from "react";
import { Box, Button, Container, Typography, IconButton } from "@mui/material";
import { Facebook, Instagram, Twitter, ArrowUpward } from "@mui/icons-material";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleSignUp = () => {
    navigate("/signup"); // Перенаправлення на сторінку реєстрації
  };

  const handleLogIn = () => {
    navigate("/login"); // Перенаправлення на сторінку входу
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "fixed",
          top: 0,
          width: "100%",
          backgroundColor: "#ffffff",
          p: 2,
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
          zIndex: 999,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          EmberMate
        </Typography>
        <Box sx={{ mr: 5 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ mx: 1, fontSize: "1.1rem", px: 3 }}
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
          <Button
            variant="outlined"
            color="primary"
            sx={{ fontSize: "1.1rem", px: 3, mr: 2 }}
            onClick={handleLogIn}
          >
            Log In
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          textAlign: "center",
          p: 3,
          backgroundColor: "#f0f0f0",
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: "bold", mb: 3 }}>
          Find Your Match Today!
        </Typography>
        <Typography variant="h6" sx={{ mb: 4 }}>
          Join {new Intl.NumberFormat().format(5000)}+ users already connecting
          with each other.
        </Typography>
        <Button variant="contained" color="primary" size="large">
          Get Started
        </Button>
      </Box>

      {/* Stats Section (with animation) */}
      <Container sx={{ mt: 5, mb: 5 }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            opacity: 0,
            transform: "translateY(50px)",
            animation: "fadeIn 1.5s forwards",
          }}
        >
          <Box sx={{ p: 2, textAlign: "center", width: "30%" }}>
            <Typography
              variant="h3"
              color="primary"
              sx={{ fontWeight: "bold" }}
            >
              {new Intl.NumberFormat().format(15000)}
            </Typography>
            <Typography variant="h6">Active Users</Typography>
          </Box>
          <Box sx={{ p: 2, textAlign: "center", width: "30%" }}>
            <Typography
              variant="h3"
              color="secondary"
              sx={{ fontWeight: "bold" }}
            >
              {new Intl.NumberFormat().format(10000)}
            </Typography>
            <Typography variant="h6">Matches this Month</Typography>
          </Box>
          <Box sx={{ p: 2, textAlign: "center", width: "30%" }}>
            <Typography
              variant="h3"
              color="success.main"
              sx={{ fontWeight: "bold" }}
            >
              {new Intl.NumberFormat().format(2000)}
            </Typography>
            <Typography variant="h6">Connections in Progress</Typography>
          </Box>
        </Box>
      </Container>

      <Box
        component="footer"
        sx={{
          backgroundColor: "#333",
          color: "#fff",
          p: 4,
          textAlign: "center",
          mt: "auto",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          AI Dating - Bringing People and AI Together
        </Typography>
        <Box sx={{ mb: 3 }}>
          <IconButton sx={{ color: "#fff" }}>
            <Facebook />
          </IconButton>
          <IconButton sx={{ color: "#fff" }}>
            <Instagram />
          </IconButton>
          <IconButton sx={{ color: "#fff" }}>
            <Twitter />
          </IconButton>
        </Box>
        <Typography variant="body2">About Us | Contact Us</Typography>
      </Box>

      {showScrollButton && (
        <Box
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            zIndex: 1000,
          }}
        >
          <IconButton
            color="primary"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <ArrowUpward />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default LandingPage;
