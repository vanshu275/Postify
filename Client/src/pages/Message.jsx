import React from "react";
import { useNavigate } from "react-router";
import { getConversationUsers } from "../api/messageApi";
import { defaultProfile } from "../constants/profile";
import { searchUsers } from "../api/profileApi";
import { Search } from "lucide-react";

const Message = () => {
  const navigate = useNavigate();

  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const [search, setSearch] = React.useState("");
  const [searchLoading, setSearchLoading] = React.useState(false);
  const [searchingUser, setSearchingUser] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getConversationUsers();
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async (query) => {
    setSearch(query);

    if (!query.trim()) {
      setSearchingUser([]);
      return;
    }

    try {
      setSearchLoading(true);

      const res = await searchUsers(query);
      setSearchingUser(res.data);
    } catch (error) {
      console.error(error);
      setSearchingUser([]);
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-zinc-950 px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-2xl">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-zinc-100">
            Messages
          </h1>

          <p className="mt-1 text-sm text-zinc-500">
            Your conversations
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <div className="flex h-12 items-center rounded-xl border border-zinc-800 bg-zinc-900 px-4">
            <Search className="h-5 w-5 text-zinc-500" />

            <input
              type="text"
              placeholder="Search by username..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="ml-3 w-full bg-transparent text-white outline-none placeholder:text-zinc-500"
            />
          </div>

          {/* Search Results */}
          {search.trim() && (
            <div className="absolute left-0 right-0 top-14 z-20 rounded-xl border border-zinc-800 bg-zinc-900 p-2 shadow-xl">

              {searchLoading ? (
                <p className="p-4 text-center text-sm text-zinc-500">
                  Searching...
                </p>
              ) : searchingUser.length === 0 ? (
                <p className="p-4 text-center text-sm text-zinc-500">
                  User not found.
                </p>
              ) : (
                searchingUser.map((user) => (
                  <button
                    key={user._id}
                    onClick={() => navigate(`/message/${user._id}`)}
                    className="flex w-full items-center gap-3 rounded-lg p-3 text-left hover:bg-zinc-800"
                  >
                    <img
                      src={user.profilePic || defaultProfile}
                      alt={user.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />

                    <div>
                      <h2 className="font-semibold text-zinc-100">
                        {user.name}
                      </h2>

                      <p className="text-sm text-zinc-500">
                        @{user.username}
                      </p>
                    </div>
                  </button>
                ))
              )}

            </div>
          )}
        </div>

        {/* Conversations */}
        <div className="space-y-2">
          {loading ? (
            <p className="py-10 text-center text-zinc-500">
              Loading conversations...
            </p>
          ) : users.length === 0 ? (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
              <p className="text-zinc-400">
                No conversations yet
              </p>
            </div>
          ) : (
            users.map((user) => (
              <button
                key={user._id}
                onClick={() => navigate(`/message/${user._id}`)}
                className="flex w-full items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-4 text-left transition hover:border-zinc-700 hover:bg-zinc-800"
              >
                <img
                  src={user.profilePic || defaultProfile}
                  alt={user.name}
                  className="h-12 w-12 shrink-0 rounded-full border border-zinc-700 object-cover"
                />

                <div className="min-w-0">
                  <h2 className="truncate font-semibold text-zinc-100">
                    {user.name}
                  </h2>

                  <p className="truncate text-sm text-zinc-500">
                    @{user.username}
                  </p>
                </div>
              </button>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default Message;