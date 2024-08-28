import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Avatar,
  Grid,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

// Інтерфейс для користувача
interface User {
  id: number;
  name: string;
  isAI: boolean;
  avatar: string;
  description: string;
  gender?: string; // Необов'язкове поле, для використання фільтру за статтю
}

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState<User[]>([]);
  const [onlyHumans, setOnlyHumans] = useState(false);
  const [onlyFemales, setOnlyFemales] = useState(false);

  // Мокові дані користувачів
  const mockUsers: User[] = [
    {
      id: 1,
      name: "John Doe",
      isAI: false,
      avatar: "/path-to-avatar1.jpg",
      description: "Human, 29 years old.",
    },
    {
      id: 2,
      name: "Jane AI",
      isAI: true,
      avatar: "/path-to-avatar2.jpg",
      description: "AI Version 1.5.",
      gender: "female",
    },
    // Додаткові дані
  ];

  const handleSearch = () => {
    const results = mockUsers.filter((user) => {
      let matchesSearch = user.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      if (onlyHumans && user.isAI) return false;
      if (onlyFemales && user.gender !== "female") return false;
      return matchesSearch;
    });
    setFilteredResults(results);
  };

  // Дебаунсер для пошуку
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, onlyHumans, onlyFemales]);

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={onlyHumans}
                onChange={(e) => setOnlyHumans(e.target.checked)}
              />
            }
            label="Only Humans"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={onlyFemales}
                onChange={(e) => setOnlyFemales(e.target.checked)}
              />
            }
            label="Only Females"
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
        </Grid>
      </Grid>

      <List sx={{ mt: 2 }}>
        {filteredResults.map((user) => (
          <ListItem key={user.id}>
            <Avatar src={user.avatar} sx={{ mr: 2, width: 56, height: 56 }} />
            <ListItemText primary={user.name} secondary={user.description} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Search;
