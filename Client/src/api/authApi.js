import api from "./axios";

export const loginUser = async (username, password) => {
  const response = await api.post("/auth/login", {
    username: username.toLowerCase().trim(),
    password,
  });

  return response.data;
};

export const registerUser = async (name, username, password) => {
  const response = await api.post("/auth/register", {
    name: name.trim(),
    username: username.toLowerCase().trim(),
    password,
  });

  return response.data;
};

export const getMe = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};