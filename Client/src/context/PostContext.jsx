import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { createPost, getPosts, deletePost, likePostApi } from "../api/postApi";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);       // initial load
  const [loadingMore, setLoadingMore] = useState(false); // pagination load
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Pehli baar posts laane ke liye
  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getPosts(1, 10);
      setPosts(res.data);
      setPage(1);
      setHasMore(res.pagination.hasMore);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Scroll/"Load more" pe next page laane ke liye
  const loadMorePosts = useCallback(async () => {
    if (loadingMore || !hasMore) return; // already loading ya aur posts nahi hai toh rukk

    try {
      setLoadingMore(true);
      const nextPage = page + 1;
      const res = await getPosts(nextPage, 10);

      setPosts((prev) => [...prev, ...res.data]); // purane posts ke saath append
      setPage(nextPage);
      setHasMore(res.pagination.hasMore);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingMore(false);
    }
  }, [page, hasMore, loadingMore]);

  // Post add krne ke liye
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

      const res = await createPost(formData);
      setPosts((prev) => [res.data, ...prev]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const removePost = async (postId) => {
    try {
      await deletePost(postId);

      setPosts((prev) => prev.filter((post) => post._id !== postId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (postId) => {
    try {
      const response = await likePostApi(postId);

      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId
            ? response.post
            : post
        )
      );
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <PostContext.Provider
      value={{
        posts,
        loading,
        loadingMore,
        hasMore,
        fetchPosts,
        loadMorePosts,
        addPost,
        removePost,
        handleLike,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => {
  return useContext(PostContext);
};