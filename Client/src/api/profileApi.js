import api from "./axios";


export const getProfile = async (username) => {
  const res = await api.get(`/profile/${username}`);
  return res.data;
};


export const updateProfile = async (data) => {
  const res = await api.patch("/profile", data);
  return res.data;
};