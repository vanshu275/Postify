import api from "./axios";

export const loginUser = async (username, password) => {
  const response = await api.post("/auth/login", {
    username: username.toLowerCase(),
    password,
  });

  return response.data;
};

export const registerUser = async (name, username, password) => {
  const response = await api.post("/auth/register", {
    name,
    username: username.toLowerCase(),
    password,
  });

  return response.data;
};

export const getMe = async () => {
  const response = await api.get("/auth/me");

  return response.data;
};