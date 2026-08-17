import { useState } from "react";
import { defaultCover, defaultProfile } from "../../constants/profile";
import FollowListModal from "../boxModal/FollowListModal";


const ProfileHeader = ({ user, onEditClick }) => {
  const [modal, setModal] = useState(null);

  return (
    <>
      {/* Cover */}
      <div className="relative h-40 sm:h-56 w-full">
        <img
          src={user.coverPic || defaultCover}
          alt="Cover"
          className="h-full w-full object-cover"
        />

        {/* Profile Avatar */}
        <div className="absolute -bottom-10 sm:-bottom-12 left-4 sm:left-8">
          <img
            src={user.profilePic || defaultProfile}
            alt="Profile"
            className="h-24 w-24 sm:h-32 sm:w-32 rounded-full border-4 border-zinc-900 object-cover bg-zinc-800"
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-8 pb-6 sm:pb-8 pt-12 sm:pt-16">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100 truncate">
              {user.name}
            </h1>

            <p className="mt-0.5 sm:mt-1 text-sm sm:text-base text-zinc-400 truncate">
              @{user.username}
            </p>

            {user.bio && (
              <p className="mt-3 sm:mt-4 max-w-xl text-sm sm:text-base leading-snug sm:leading-normal text-zinc-200 break-words">
                {user.bio}
              </p>
            )}
          </div>

          {/* Edit Button */}
          <button
            type="button"
            onClick={onEditClick}
            className="self-start sm:self-auto shrink-0 rounded-xl border border-blue-500 px-4 sm:px-5 py-1.5 sm:py-2 text-sm sm:text-base font-medium text-blue-400 transition hover:bg-blue-600 hover:text-white"
          >
            Edit Profile
          </button>
        </div>

        {/* Stats */}
        <div className="mt-6 sm:mt-8 flex gap-6 text-sm sm:text-base">
          <div
            onClick={() => {
              setModal("followers")
            }}
            className="flex items-center gap-1.5 cursor-pointer "
          >
            <p className="text-lg sm:text-xl font-bold text-zinc-100">
              {user.followers?.length || 0}
            </p>
            <p className="text-zinc-400">Followers</p>
          </div>

          <div
            onClick={() => {
              setModal("following")
            }}
            className="flex items-center gap-1.5 cursor-pointer">
            <p className="text-lg sm:text-xl font-bold text-zinc-100">
              {user.following?.length || 0}
            </p>
            <p className="text-zinc-400">Following</p>
          </div>



        </div>

        <FollowListModal
          type={modal}
          opened={!!modal}
          userId={user?._id}
          onClose={() => {
            setModal(null)
          }}
        />

      </div>
    </>
  );
};

export default ProfileHeader;