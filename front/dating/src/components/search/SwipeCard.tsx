import React, { useState } from "react";
import { Box, Typography, Avatar, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { motion } from "framer-motion"; // Для анімацій

interface SwipeCardProps {
  user: { name: string; avatar: string; description: string };
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

const SwipeCard: React.FC<SwipeCardProps> = ({
  user,
  onSwipeLeft,
  onSwipeRight,
}) => {
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(
    null
  );

  const handleSwipe = (direction: "left" | "right") => {
    setSwipeDirection(direction);
    if (direction === "left") onSwipeLeft();
    else onSwipeRight();
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: -100, right: 100 }}
      onDragEnd={(event, info) => {
        if (info.point.x < -100) handleSwipe("left");
        if (info.point.x > 100) handleSwipe("right");
      }}
      style={{
        boxShadow:
          swipeDirection === "left"
            ? "0 0 15px red"
            : swipeDirection === "right"
            ? "0 0 15px green"
            : "",
        borderRadius: "8px",
        overflow: "hidden",
        width: "100%",
        maxWidth: "500px",
        margin: "0 auto",
        padding: "20px",
        background: "#fff",
        textAlign: "center",
      }}
    >
      <Avatar
        src={user.avatar}
        sx={{ width: 100, height: 100, mb: 2, margin: "0 auto" }}
      />
      <Typography variant="h5" gutterBottom>
        {user.name}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {user.description}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton onClick={() => handleSwipe("left")}>
          <ArrowBack />
        </IconButton>
        <IconButton onClick={() => handleSwipe("right")}>
          <ArrowForward />
        </IconButton>
      </Box>
    </motion.div>
  );
};

export default SwipeCard;
