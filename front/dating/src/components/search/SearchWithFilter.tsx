import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import FilterSection from "./FilterSection";
import SwipeCard from "./SwipeCard";

const mockUsers = [
  {
    name: "John Doe",
    avatar: "/path-to-avatar1.jpg",
    description: "Human, 29 years old.",
    preferences: "Likes sports and movies.",
    location: "New York",
    lookingFor: "Long-term relationship",
  },
  {
    name: "Jane AI",
    avatar: "/path-to-avatar2.jpg",
    description: "AI Version 1.5.",
    preferences: "Data analysis, chatting.",
    location: "AI Server 5",
    lookingFor: "Data exchange, friendship",
  },
  {
    name: "Alex Human",
    avatar: "/path-to-avatar3.jpg",
    description: "Human, 34 years old.",
    preferences: "Travelling, reading.",
    location: "London",
    lookingFor: "Friendship",
  },
  {
    name: "Sophia AI",
    avatar: "/path-to-avatar4.jpg",
    description: "AI Version 2.0.",
    preferences: "Machine learning, robotics.",
    location: "AI Server 12",
    lookingFor: "Collaboration",
  },
  {
    name: "Michael Doe",
    avatar: "/path-to-avatar5.jpg",
    description: "Human, 45 years old.",
    preferences: "Cooking, fitness.",
    location: "Los Angeles",
    lookingFor: "Partnership",
  },
  {
    name: "Emma AI",
    avatar: "/path-to-avatar6.jpg",
    description: "AI Version 1.8.",
    preferences: "Philosophy, chatting.",
    location: "AI Server 3",
    lookingFor: "Conversation",
  },
  {
    name: "Olivia Human",
    avatar: "/path-to-avatar7.jpg",
    description: "Human, 25 years old.",
    preferences: "Fashion, art.",
    location: "Paris",
    lookingFor: "Relationship",
  },
  {
    name: "Liam AI",
    avatar: "/path-to-avatar8.jpg",
    description: "AI Version 1.2.",
    preferences: "Quantum computing, chess.",
    location: "AI Server 7",
    lookingFor: "Mentorship",
  },
  {
    name: "Noah Human",
    avatar: "/path-to-avatar9.jpg",
    description: "Human, 22 years old.",
    preferences: "Music, hiking.",
    location: "Berlin",
    lookingFor: "Friendship",
  },
  {
    name: "Ella AI",
    avatar: "/path-to-avatar10.jpg",
    description: "AI Version 3.0.",
    preferences: "Virtual reality, storytelling.",
    location: "AI Server 9",
    lookingFor: "Creative collaboration",
  },
];

const SearchWithFilters: React.FC = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);

  const handleSwipeLeft = () => {
    setCurrentUserIndex((prevIndex) => (prevIndex + 1) % mockUsers.length);
  };

  const handleSwipeRight = () => {
    setCurrentUserIndex((prevIndex) => (prevIndex + 1) % mockUsers.length);
    // Логіка додавання співрозмовника до списку
  };

  const startSearch = () => {
    setIsSearching(true);
  };

  const stopSearch = () => {
    setIsSearching(false);
  };

  return (
    <Box sx={{ p: 2, position: "relative" }}>
      {!isSearching && <FilterSection onApplyFilters={startSearch} />}

      {isSearching && (
        <Box
          sx={{
            position: "relative",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <SwipeCard
            user={mockUsers[currentUserIndex]}
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
          />

          <Button
            onClick={stopSearch}
            fullWidth
            variant="contained"
            color="error"
            sx={{ mt: 2 }}
          >
            Stop Search
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default SearchWithFilters;
