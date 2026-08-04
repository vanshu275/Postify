import api from "./axios";

export const createPost = async (formData) => {
  const response = await api.post(
    "/posts",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const getPosts = async () => {
  const response = await api.get("/posts");

  return response.data;
};

export const getMyPosts = async () =>{
  const response = await api.get("/posts/myPost");

  return response.data ;
}

