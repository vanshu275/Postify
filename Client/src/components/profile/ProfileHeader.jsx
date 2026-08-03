import { defaultCover , defaultProfile } from "../../constants/profile";


const ProfileHeader = ({ user, onEditClick }) => {
 return (
    <>
      {/* Cover */}
      <div className="relative h-56 w-full">
        <img
          src={user.coverPic || defaultCover}
          alt="Cover"
          className="h-[91%] w-full object-cover"
        />

        {/* Profile */}
        <div className="absolute -bottom-8 left-8">
          <img
            src={user.profilePic || defaultProfile}
            alt="Profile"
            className="h-32 w-32 rounded-full border-4 border-zinc-900 object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-8 pb-8 pt-10">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">{user.name}</h1>

            <p className="mt-1 text-zinc-400">@{user.username}</p>

            {user.bio && (
              <p className="mt-4 max-w-xl text-zinc-200">{user.bio}</p>
            )}
          </div>

          <button
            onClick={onEditClick}
            className="rounded-xl border border-blue-500 px-5 py-2 font-medium text-blue-400 transition hover:bg-blue-600 hover:text-white"
          >
            Edit Profile
          </button>
        </div>

        {/* Stats */}
        <div className="mt-8 flex gap-5">
          <div className="flex items-center gap-1">
            <p className="text-xl font-bold">
              {user.followers.length}
            </p>
            <p className="text-zinc-400">Followers</p>
          </div>

          <div className="flex items-center gap-1">
            <p className="text-xl font-bold">
              {user.following.length}
            </p>
            <p className="text-zinc-400">Following</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;