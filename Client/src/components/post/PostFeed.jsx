import { usePosts } from "../../context/PostContext";
import PostCard from "./PostCard";

export default function PostFeed() {
  const { posts, loading } = usePosts();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}