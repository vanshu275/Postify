import { usePosts } from "../../context/PostContext";
import PostCard from "./PostCard";

export default function PostFeed() {
  const { posts, loading , hasMore , loadMorePosts} = usePosts();

  if (loading) {
    return <p>Loading...</p>;
  }
  if(!posts || posts.length === 0) {
    return <p>No posts available.</p>;
  }

  return (
    <div className="space-y-6">
      {posts.map(post => (
        <PostCard key={post._id} post={post} />
      ))}

      {hasMore && (
        <button onClick={loadMorePosts}>
          Load More
        </button>
      )}
    </div>
  );
}