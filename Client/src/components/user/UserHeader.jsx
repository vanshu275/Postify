import { useState, useEffect } from "react";
import FollowListModal from "../boxModal/FollowListModal";
import { toggleFollow } from "../../api/followApi";
import { defaultCover, defaultProfile } from "../../constants/profile";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

const UserHeader = ({ user }) => {
    const navigate = useNavigate();
    const { user: currentUser } = useAuth();
    const [followModal, setFollowModal] = useState(null);

    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        if (!currentUser || !user?.followers) return;

        setIsFollowing(
            user.followers.some(
                follower =>
                    follower._id.toString() === currentUser._id.toString()
            )
        );
    }, [user, currentUser]);

    const [followersCount, setFollowersCount] = useState(
        user.followers?.length || 0
    );

    const handleFollow = async () => {
        try {
            await toggleFollow(user._id);

            if (isFollowing) {
                setIsFollowing(false);
                setFollowersCount(prev => prev - 1);
            } else {
                setIsFollowing(true);
                setFollowersCount(prev => prev + 1);
            }
        } catch (error) {
            console.error("Follow error:", error);
        }
    };

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
                </div>

                {/* Stats */}
                <div className="mt-6 sm:mt-8 flex gap-6 text-sm sm:text-base">
                    <div
                        onClick={() => setFollowModal("followers")}
                        className="flex items-center gap-1.5 cursor-pointer"
                    >
                        <p className="text-lg sm:text-xl font-bold text-zinc-100">
                            {followersCount}
                        </p>

                        <p className="text-zinc-400">
                            Followers
                        </p>
                    </div>

                    <div
                        onClick={() => setFollowModal("following")}
                        className="flex items-center gap-1.5 cursor-pointer"
                    >
                        <p className="text-lg sm:text-xl font-bold text-zinc-100">
                            {user.following?.length || 0}
                        </p>

                        <p className="text-zinc-400">
                            Following
                        </p>
                    </div>
                </div>

                <FollowListModal
                    opened={!!followModal}
                    onClose={() => setFollowModal(null)}
                    userId={user._id}
                    type={followModal}
                />






                <div className="mt-6 flex gap-3">
                    {currentUser?._id !== user._id && (
                        <button
                            onClick={handleFollow}
                            className="rounded-xl bg-blue-600 px-8 py-2.5 font-medium text-white hover:bg-blue-700"
                        >
                            {isFollowing ? "Following" : "Follow"}
                        </button>
                    )}

                    <button
                        onClick={() => navigate(`/message/${user._id}`)}
                        className="rounded-xl border border-zinc-700 px-6 py-2.5 text-zinc-200 hover:bg-zinc-800"
                    >
                        Message
                    </button>
                </div>









            </div>
        </>
    );
};

export default UserHeader;