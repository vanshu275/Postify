import CreatePost from "../components/post/CreatePost";
import PostCard from "../components/post/PostCard";

export default function Home() {
  return (
    <div className="space-y-6">

      {/* ================= Create Post ================= */}

      <CreatePost />

      {/* ================= Feed ================= */}

      {/* Backend se posts aayenge */}

      <PostCard />
    </div>
  );
}