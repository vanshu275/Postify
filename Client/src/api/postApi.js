import api from "./axios";

export const createPost = async (formData) => {
  const response = await api.post("/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getPosts = async (page = 1, limit = 10) => {
  const response = await api.get(`/posts?page=${page}&limit=${limit}`);
  return response.data;
};

export const getMyPosts = async (page = 1, limit = 10) => {
  const response = await api.get(`/posts/myPost?page=${page}&limit=${limit}`);
  return response.data;
};

export const getUserPosts = async (username, page = 1, limit = 10) => {
  const response = await api.get(
    `/posts/user/${username}?page=${page}&limit=${limit}`
  );
  return response.data;
}