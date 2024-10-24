import axios from "axios";
import { API_URL } from "../config/Api"; // Імпортуємо API_URL
import { useUserStore } from "../store/UserStore";
import { jwtDecode } from "jwt-decode";

interface DecodedRoleToken {
  role: string;
}
interface DecodedIdToken {
  user_id: string;
}

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await axios.post(`${API_URL}/register`, {
    name,
    email,
    password,
  });
  const { access_token, refresh_token } = response.data;
  const decodedRole: DecodedRoleToken = jwtDecode(access_token);
  const userRole = decodedRole.role;
  const decoded: DecodedIdToken = jwtDecode(access_token);
  const id = decoded.user_id;
  const profile = getProfile(id);
  const setUser = useUserStore.getState().signIn;
  setUser(profile, "user");
  localStorage.setItem("access_token", access_token);
  localStorage.setItem("refresh_token", refresh_token);
  return { userRole, profile };
};

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, {
    email: email, // OAuth2PasswordRequestForm чекає поле username
    password,
  });
  const { access_token, refresh_token } = response.data;

  const decodedRole: DecodedRoleToken = jwtDecode(access_token);
  const userRole = decodedRole.role;
  const decodedId: DecodedIdToken = jwtDecode(access_token);
  const id = decodedId.user_id;
  const profile = getProfile(id);
  const setUser = useUserStore.getState().signIn;
  setUser(profile, userRole);
  localStorage.setItem("access_token", access_token);
  localStorage.setItem("refresh_token", refresh_token);

  return { userRole, profile };
};

export const getProfile = async (id: string) => {
  console.log(id);
  const response = await axios.post(`${API_URL}/profile`, {
    user_id: id,
  });
  const { profile } = response.data;
  return profile;
};
