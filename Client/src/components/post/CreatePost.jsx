import { ImagePlus, Smile, SendHorizontal } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { usePosts } from "../../context/PostContext";
import { useState } from "react";
import { useRef } from "react";

export default function CreatePost() {
  const { user } = useAuth();
  const { addPost, loading } = usePosts();

  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const fileInputRef = useRef(null);
  const handleSubmit = async () => {
    await addPost(content, image);

    setContent("");
    setImage(null);
  };


  return (
    <div className="w-full max-w-xl mx-auto rounded-2xl border border-zinc-800 bg-zinc-900 p-4 sm:p-5 shadow-lg">

      {/* ================= Header ================= */}

      <div className="mb-4 sm:mb-5 flex items-center gap-3">

        {/* Profile Image */}
        <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 text-base sm:text-lg font-semibold text-white">
          {user?.username?.charAt(0).toUpperCase() || "U"}
        </div>

        <div className="min-w-0">
          <h3 className="font-semibold text-sm sm:text-base text-zinc-100 truncate">
            {user?.username || "Username"}
          </h3>

          <p className="text-xs sm:text-sm text-zinc-500 truncate">
            Share what's on your mind...
          </p>
        </div>

      </div>

      {/* ================= Text Area ================= */}

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's happening?"
        rows={4}
        className="w-full resize-none rounded-xl border border-zinc-800 bg-zinc-950 p-3 sm:p-4 text-sm sm:text-base text-zinc-100 outline-none transition focus:border-blue-500 placeholder:text-zinc-500"
      />

      {/* ================= Bottom Actions ================= */}

      <div className="mt-4 sm:mt-5 flex items-center justify-between gap-3">

        <div className="flex items-center gap-2 min-w-0">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-lg p-2 text-zinc-400 hover:text-zinc-100 transition hover:bg-zinc-800 shrink-0"
            title="Add image"
          >
            <ImagePlus size={20} />
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setImage(e.target.files[0])}
          />

          {image && (
            <span className="text-sm text-green-500 truncate">
              ✓ {image.name}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 sm:px-5 py-2 text-sm sm:text-base font-medium text-white transition hover:bg-blue-700 disabled:opacity-50 shrink-0"
        >
          <SendHorizontal size={16} className="sm:w-[18px] sm:h-[18px]" />
          <span>{loading ? "Posting..." : "Post"}</span>
        </button>

      </div>

    </div>
  );
}