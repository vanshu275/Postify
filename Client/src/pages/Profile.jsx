import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getProfile } from "../api/profileApi";

const defaultCover =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200";

const defaultProfile =
  "https://ui-avatars.com/api/?background=2563eb&color=fff&size=256&name=User";

const Profile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, [username]);

  const fetchProfile = async () => {
    try {
      const res = await getProfile(username);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return (
      <div className="py-20 text-center text-zinc-400">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
      {/* Cover */}
      <div className="relative h-56 w-full">
        <img
          src={user.coverPic || defaultCover}
          alt="Cover"
          className="h-full w-full object-cover"
        />

        {/* Profile */}
        <div className="absolute -bottom-16 left-8">
          <img
            src={user.profilePic || defaultProfile}
            alt="Profile"
            className="h-32 w-32 rounded-full border-4 border-zinc-900 object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-8 pb-8 pt-20">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">{user.name}</h1>

            <p className="mt-1 text-zinc-400">@{user.username}</p>

            {user.bio && (
              <p className="mt-4 max-w-xl text-zinc-200">{user.bio}</p>
            )}
          </div>

          <button className="rounded-xl border border-blue-500 px-5 py-2 font-medium text-blue-400 transition hover:bg-blue-600 hover:text-white">
            Edit Profile
          </button>
        </div>

        {/* Stats */}
        <div className="mt-8 flex gap-10">
          <div>
            <p className="text-xl font-bold">0</p>
            <p className="text-sm text-zinc-400">Posts</p>
          </div>

          <div>
            <p className="text-xl font-bold">{user.followers.length}</p>
            <p className="text-sm text-zinc-400">Followers</p>
          </div>

          <div>
            <p className="text-xl font-bold">{user.following.length}</p>
            <p className="text-sm text-zinc-400">Following</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-10 flex border-b border-zinc-800">
          <button className="border-b-2 border-blue-500 px-5 py-3 font-semibold text-white">
            Posts
          </button>

          <button className="px-5 py-3 text-zinc-400 transition hover:text-white">
            Saved
          </button>
        </div>

        {/* Posts */}
        <div className="py-12 text-center text-zinc-500">
          No posts yet.
        </div>
      </div>
    </div>
  );
};

export default Profile;