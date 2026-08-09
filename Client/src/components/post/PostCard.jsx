import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { usePosts } from "../../context/PostContext";
import CommentModal from "./CommentModal";

export default function PostCard({ post }) {
  const [commentOpen, setCommentOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { removePost, handleLike } = usePosts();


  const isLiked = post.likes?.some(
    (id) => id.toString() === user?._id?.toString()
  );

  return (

    <>
      <CommentModal
        post={post}
        opened={commentOpen}
        onClose={() => setCommentOpen(false)}
      />


      <article className="w-full max-w-xl mx-auto overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-3.5 sm:p-5 relative">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 font-semibold text-sm sm:text-base text-white">
              {post.user?.username?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div className="min-w-0">
              <h3 className="font-semibold text-sm sm:text-base text-zinc-100 truncate">
                {post.user.username}
              </h3>

              <p className="text-xs sm:text-sm text-zinc-500 truncate">
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          {
            user._id === post.user._id ?
              <button
                type="button"
                className="rounded-lg p-1.5 sm:p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-100 shrink-0"
                onClick={() => setOpen(!open)}
              >
                <MoreHorizontal className="w-5 h-5" />
              </button> : ""
          }
          {
            open && (
              <div className="absolute right-5 top-16 bg-zinc-800  hover:bg-zinc-600 rounded-4xl text-white shadow-lg z-10">
                <button
                  type="button"
                  className="block w-full text-left px-4 py-2 "
                  onClick={async () => {
                    await removePost(post._id);
                  }}
                >
                  Delete Post
                </button>
              </div>
            )
          }

        </div>

        {/* Caption */}
        <div className="px-3.5 sm:px-5 pb-3 sm:pb-4">
          <p className="text-sm sm:text-base leading-6 sm:leading-7 text-zinc-200 break-words">
            {post.content}
          </p>
        </div>

        {/* Image */}
        {post.image && (
          <div className="overflow-hidden border-y border-zinc-800">
            <img
              src={post.image}
              alt="Post"
              className="max-h-[450px] w-full object-cover"
            />
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between px-3.5 sm:px-5 pt-3 sm:pt-4 text-xs sm:text-sm text-zinc-400">
          <p>
            <span className="font-semibold text-white">{post.likes?.length || 0}</span> Likes
          </p>

          <div className="flex gap-2.5 sm:gap-4">
            <p>
              <span className="font-semibold text-white">{post.commentsCount || 0}</span> Comments
            </p>

            <p>
              <span className="font-semibold text-white">0</span> Shares
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-3 sm:mt-4 flex items-center justify-between border-t border-zinc-800 p-2 sm:p-3">
          <div className="flex items-center gap-1 sm:gap-2">

            {/* Like Button */}
            <button
              type="button"
              onClick={() => handleLike(post._id)}
              className={`rounded-xl p-2 sm:p-3 transition hover:bg-zinc-800 ${isLiked
                ? "text-red-500"
                : "text-zinc-400 hover:text-zinc-100"
                }`}
            >
              <Heart
                className={`w-5 h-5 sm:w-[22px] sm:h-[22px] ${isLiked ? "fill-red-500 text-red-500" : ""
                  }`}
              />
            </button>

            {/* Comment Button */}
            <button
              type="button"
              onClick={() => setCommentOpen(true)}
              className="rounded-xl p-2 sm:p-3 text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-100"
            >
              <MessageCircle
                className="w-5 h-5 sm:w-[22px] sm:h-[22px]"
              />

            </button>

            <button type="button" className="rounded-xl p-2 sm:p-3 text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-100">
              <Share2 className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
            </button>
          </div>

          <button type="button" className="rounded-xl p-2 sm:p-3 text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-100">
            <Bookmark className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
          </button>
        </div>
      </article >

    </>

  );
}