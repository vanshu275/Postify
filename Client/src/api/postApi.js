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

// delete post
export const deletePost = async (postId) => {
  const response = await api.delete(`/posts/${postId}`);
  return response.data;
};

// postApi.js
export const likePostApi = async (postId) => {
  const response = await api.patch(`/posts/${postId}/like`);
  return response.data;
};

export const commentPostApi = async (postId, content) => {
  const response = await api.post(`/posts/${postId}/comment`, content);
  return response.data;
};

export const getCommentsApi = async (postId) => {
  const response = await api.get(`/posts/${postId}/comments`);
  return response.data;
};