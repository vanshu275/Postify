import { createContext, useContext, useEffect, useState } from "react";
import { createPost, getPosts } from "../api/postApi";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      setLoading(true);

      const data = await getPosts();
      setPosts(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const addPost = async (content, image) => {
    try {
      if (!content.trim() || !image) {
        alert("Please provide both content and image.");
        return;
      }

      setLoading(true);

      const formData = new FormData();
      formData.append("content", content);
      formData.append("image", image);

      await createPost(formData);

      await fetchPosts();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <PostContext.Provider
      value={{
        posts,
        loading,
        fetchPosts,
        addPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => {
  return useContext(PostContext);
};