import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";

export default function PostCard() {
  return (
    <article className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-lg">

      {/* ================= Header ================= */}

      <div className="flex items-center justify-between p-5">

        <div className="flex items-center gap-3">

          {/* Profile Picture */}

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 font-semibold">
            V
          </div>

          <div>

            {/* Backend */}

            <h3 className="font-semibold">
              Vansh
            </h3>

            <p className="text-sm text-zinc-500">
              2 min ago
            </p>

          </div>

        </div>

        <button className="rounded-lg p-2 transition hover:bg-zinc-800">
          <MoreHorizontal size={20} />
        </button>

      </div>

      {/* ================= Caption ================= */}

      <div className="px-5 pb-4">

        {/* Backend Caption */}

        <p className="leading-7 text-zinc-200">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Repellendus autem reprehenderit iste cumque dicta unde.
        </p>

      </div>

      {/* ================= Image ================= */}

      {/* If Image Exists */}

      <div className="overflow-hidden border-y border-zinc-800">

        <img
          src="https://picsum.photos/700/500"
          alt="Post"
          className="h-[420px] w-full object-cover"
        />

      </div>

      {/* ================= Stats ================= */}

      <div className="flex items-center justify-between px-5 pt-4 text-sm text-zinc-400">

        <p>

          <span className="font-semibold text-white">
            234
          </span>{" "}
          Likes

        </p>

        <div className="flex gap-4">

          <p>

            <span className="font-semibold text-white">
              18
            </span>{" "}
            Comments

          </p>

          <p>

            <span className="font-semibold text-white">
              4
            </span>{" "}
            Shares

          </p>

        </div>

      </div>

      {/* ================= Actions ================= */}

      <div className="mt-4 flex items-center justify-between border-t border-zinc-800 p-3">

        <div className="flex items-center gap-2">

          <button className="rounded-xl p-3 transition hover:bg-zinc-800">
            <Heart size={22} />
          </button>

          <button className="rounded-xl p-3 transition hover:bg-zinc-800">
            <MessageCircle size={22} />
          </button>

          <button className="rounded-xl p-3 transition hover:bg-zinc-800">
            <Share2 size={22} />
          </button>

        </div>

        <button className="rounded-xl p-3 transition hover:bg-zinc-800">
          <Bookmark size={22} />
        </button>

      </div>

      {/* ================= Future Logic ================= */}

      {/*
          Post Data

          username
          profilePic
          createdAt
          caption
          image
          likes
          comments

          Like API

          Comment Modal

          Share

          Save Post

          Delete Post (Owner)

          Edit Post
      */}

    </article>
  );
}