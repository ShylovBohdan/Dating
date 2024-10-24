import React, { useState } from "react";
import { Box, Typography, Avatar, IconButton } from "@mui/material";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

interface User {
  name: string;
  avatar: string;
  description: string;
  preferences: string;
  location: string;
  lookingFor: string;
}

interface SwipeCardProps {
  user: User;
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
  const x = useMotionValue(0);
  const boxShadow = useTransform(
    x,
    [-200, 0, 200],
    [
      "0px 5px 20px rgba(255, 0, 0, 0.5)",
      "0px 5px 20px rgba(0, 0, 0, 0)",
      "0px 5px 20px rgba(0, 255, 0, 0.5)",
    ]
  );

  const handleSwipe = (direction: "left" | "right") => {
    setSwipeDirection(direction);
    if (direction === "left") onSwipeLeft();
    else onSwipeRight();

    // Повертаємо картку до центру після свайпу
    x.set(0);
  };

  const handleEndDrag = (event: any, info: any) => {
    const threshold = window.innerWidth * 0.2; // 20% ширини екрану

    if (info.offset.x < -threshold) {
      handleSwipe("left");
    } else if (info.offset.x > threshold) {
      handleSwipe("right");
    } else {
      // Якщо не досягнуто порогу 20%, повертаємо картку до центру
      x.set(0);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        margin: "0 auto",
      }}
    >
      {/* Ліва стрілка */}
      <IconButton
        sx={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          height: "100%",
          width: "60px",
          background:
            "linear-gradient(to right, rgba(255, 0, 0, 0.3), rgba(255, 0, 0, 0))",
          borderRadius: 0,
          zIndex: 10,
        }}
        onClick={() => handleSwipe("left")}
      >
        <ChevronLeft sx={{ fontSize: 40 }} />
      </IconButton>

      {/* Картка */}
      <AnimatePresence>
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          style={{
            x,
            boxShadow,
            borderRadius: "8px",
            overflow: "hidden",
            width: "50%",
            height: "auto",
            padding: "20px",
            // margin: "0 50px 0 50px",
            background: "#fff",
            textAlign: "center",
          }}
          onDragEnd={handleEndDrag}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Avatar
            src={user.avatar}
            sx={{ width: 150, height: 150, mb: 2, margin: "0 auto" }}
          />
          <Typography variant="h5" gutterBottom>
            {user.name}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {user.description}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Preferences: {user.preferences}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Location: {user.location}
          </Typography>
          <Typography variant="body2">
            Looking for: {user.lookingFor}
          </Typography>
        </motion.div>
      </AnimatePresence>

      {/* Права стрілка */}
      <IconButton
        sx={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          height: "100%",
          width: "60px",
          background:
            "linear-gradient(to left, rgba(0, 255, 0, 0.3), rgba(0, 255, 0, 0))",
          borderRadius: 0,
          zIndex: 10,
        }}
        onClick={() => handleSwipe("right")}
      >
        <ChevronRight sx={{ fontSize: 40 }} />
      </IconButton>
    </Box>
  );
};

export default SwipeCard;
