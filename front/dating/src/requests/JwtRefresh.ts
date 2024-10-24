import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const refreshToken = async () => {
  const refresh_token = localStorage.getItem("refresh_token");
  const response = await axios.post(`${API_URL}/user/refresh-token`, {
    refresh_token,
  });
  const { access_token } = response.data;

  // Оновлюємо токен
  localStorage.setItem("access_token", access_token);
  return access_token;
};
