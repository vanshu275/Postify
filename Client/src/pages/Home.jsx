import CreatePost from "../components/post/CreatePost";
import PostCard from "../components/post/PostCard";
import PostFeed from "../components/post/PostFeed";

export default function Home() {
  return (
    <div className="space-y-6">

      {/* ================= Create Post ================= */}

      <CreatePost />

      {/* ================= Feed ================= */}

      {/* Backend se posts aayenge */}

      <PostFeed />
    </div>
  );
}