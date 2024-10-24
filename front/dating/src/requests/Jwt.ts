import axios from "axios";

const API_URL = "http://localhost:8000/api";

// Функція для отримання токена з localStorage
const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

// Приклад захищеного запиту
export const getUserProfile = async () => {
  const token = getAccessToken();
  const response = await axios.get(`${API_URL}/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
