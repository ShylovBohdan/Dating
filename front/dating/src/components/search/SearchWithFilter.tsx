import React, { useState } from "react";
import { Box } from "@mui/material";
import FilterSection from "./FilterSection";
import SwipeCard from "./SwipeCard";

const mockUsers = [
  {
    name: "John Doe",
    avatar: "/path-to-avatar1.jpg",
    description: "Human, 29 years old.",
  },
  {
    name: "Jane AI",
    avatar: "/path-to-avatar2.jpg",
    description: "AI Version 1.5.",
  },
  // Додаткові користувачі
];

const SearchWithFilters: React.FC = () => {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);

  const handleSwipeLeft = () => {
    setCurrentUserIndex((prevIndex) => (prevIndex + 1) % mockUsers.length);
  };

  const handleSwipeRight = () => {
    setCurrentUserIndex((prevIndex) => (prevIndex + 1) % mockUsers.length);
    // Додаємо користувача до списку тих, кому відправимо запит
  };

  return (
    <Box sx={{ p: 2 }}>
      <FilterSection
        onApplyFilters={() => {
          /* Логіка фільтрів */
        }}
      />
      <SwipeCard
        user={mockUsers[currentUserIndex]}
        onSwipeLeft={handleSwipeLeft}
        onSwipeRight={handleSwipeRight}
      />
    </Box>
  );
};

export default SearchWithFilters;
