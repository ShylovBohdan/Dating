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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config/Api";
import ChatIcon from "@mui/icons-material/Chat";

// Інтерфейс для користувача
interface UserProfile {
  _id: string | null;
  profile_type: string;
  user_profile: {
    created_at: string;
    age: number | null;
    gender: string | null;
    horoscope: string | null;
    hobbies: string[];
  };
  ai_profile: any; // Можна уточнити тип
}

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  created_at: string;
  profile: UserProfile | null;
}

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [onlyHumans, setOnlyHumans] = useState(false);
  const [onlyFemales, setOnlyFemales] = useState(false);
  const [onlyMales, setOnlyMales] = useState(false);
  const [onlyAi, setOnlyAi] = useState(false);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/`);
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = () => {
    const filteredResults = users.filter((user) => {
      let matchesSearch = user.username
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      if (onlyHumans && user?.profile?.profile_type !== "user") return false;
      if (onlyAi && user?.profile?.profile_type !== "ai") return false;
      if (
        onlyFemales &&
        ((user?.profile?.profile_type === "user" &&
          user?.profile?.user_profile.gender !== "female") ||
          user?.profile?.profile_type !== "user")
      )
        return false;
      if (
        onlyMales &&
        ((user?.profile?.profile_type === "user" &&
          user?.profile?.user_profile.gender !== "male") ||
          user?.profile?.profile_type !== "user")
      )
        return false;
      return matchesSearch;
    });
    setFilteredUsers(filteredResults);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, onlyHumans, onlyFemales, onlyMales, onlyAi]);

  const handleInitiateChat = (userId: string) => {
    navigate(`/chat/${userId}`);
  };

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
                checked={onlyAi}
                onChange={(e) => setOnlyAi(e.target.checked)}
              />
            }
            label="Only AI"
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
          <FormControlLabel
            control={
              <Checkbox
                checked={onlyMales}
                onChange={(e) => setOnlyMales(e.target.checked)}
              />
            }
            label="Only Males"
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
        </Grid>
      </Grid>

      <List sx={{ mt: 2 }}>
        {filteredUsers.map((user) => (
          <ListItem key={user._id}>
            <Avatar
              alt="User Avatar"
              src={"path/to/default/avatar.jpg"}
              sx={{ mr: 2, width: 56, height: 56 }}
            />
            <ListItemText
              primary={user.username}
              secondary={"Some funny text"}
            />
            <IconButton
              edge="end"
              aria-label="chat"
              onClick={() => handleInitiateChat(user._id)}
            >
              <ChatIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SearchPage;
