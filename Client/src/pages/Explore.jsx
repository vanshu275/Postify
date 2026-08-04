import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { usePosts } from "../context/PostContext";
import { searchUsers } from "../api/profileApi";

const Explore = () => {
  const { posts, loading } = usePosts();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setUsers([]);
      return;
    }

    try {
      setSearchLoading(true);
      const res = await searchUsers(query);
      setUsers(res.data);
    } catch (error) {
      console.log(error);
      setUser(null);
    } finally {
      setSearchLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center text-zinc-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-3 py-4">

      {/* Search */}
      <div className="sticky top-0 z-20 bg-black pb-4">

        <div className="flex items-center rounded-xl border border-zinc-800 bg-zinc-900 px-4 h-12">

          <Search
            className="h-5 w-5 text-zinc-500 cursor-pointer"
          />

          <input
            type="text"
            placeholder="Search by username..."
            value={search}
            onChange={(e) => {
              const value = e.target.value;
              setSearch(value);
              handleSearch(value);
            }}
            className="ml-3 w-full bg-transparent text-white outline-none placeholder:text-zinc-500"
          />

        </div>

        {/* Search Result */}
        {users.length > 0 && (
          <div className="mt-4 space-y-2">
            {users.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
                    {user.username.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h2 className="text-white font-semibold">{user.name}</h2>
                    <p className="text-zinc-400">@{user.username}</p>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/profile/${user.username}`)}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        )}

        {!searchLoading && search && users.length === 0 && (
          <p className="mt-4 text-center text-zinc-500">
            User not found.
          </p>
        )}

      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-1 sm:gap-2">

        {posts.map((post) => (
          <button
            key={post._id}
            className="group relative aspect-square overflow-hidden bg-zinc-900"
          >
            {post.image ? (
              <img
                src={post.image}
                alt=""
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center p-3 text-center text-xs text-zinc-300">
                {post.content}
              </div>
            )}

            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
              <span className="text-sm font-medium text-white">
                @{post.user.username}
              </span>
            </div>

          </button>
        ))}

      </div>

    </div>
  );
};

export default Explore;