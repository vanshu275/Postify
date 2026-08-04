import api from "./axios";


export const getProfile = async (username) => {
  const res = await api.get(`/profile/${username}`);
  return res.data;
};


export const updateProfile = async (data) => {
  const res = await api.patch("/profile", data);
  return res.data;
};

export const searchUsers = async (query) => {
  const response = await api.get(`/profile/search?query=${query}`);
  return response.data;
};