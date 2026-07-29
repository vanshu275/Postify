import { ImagePlus, Smile, SendHorizontal } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function CreatePost() {
  const { user } = useAuth();

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 shadow-lg">

      {/* ================= Header ================= */}

      <div className="mb-5 flex items-center gap-3">

        {/* Profile Image */}
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-semibold">

          {user?.username?.charAt(0).toUpperCase() || "U"}

        </div>

        <div>

          <h3 className="font-semibold">
            {user?.username || "Username"}
          </h3>

          <p className="text-sm text-zinc-500">
            Share what's on your mind...
          </p>

        </div>

      </div>

      {/* ================= Text Area ================= */}

      <textarea
        placeholder="What's happening?"
        rows={5}
        className="w-full resize-none rounded-xl border border-zinc-800 bg-zinc-950 p-4 outline-none transition focus:border-blue-500"
      />

      {/* Image Preview */}

      {/* Selected Image will render here */}

      {/* ================= Footer ================= */}

      <div className="mt-5 flex items-center justify-between">

        <div className="flex items-center gap-3">

          {/* Upload Image */}

          <button
            className="rounded-lg p-2 transition hover:bg-zinc-800"
          >
            <ImagePlus size={22} />
          </button>

          {/* Emoji */}

          <button
            className="rounded-lg p-2 transition hover:bg-zinc-800"
          >
            <Smile size={22} />
          </button>

          {/* Hidden File Input */}

          <input
            type="file"
            accept="image/*"
            className="hidden"
          />

        </div>

        {/* Submit */}

        <button
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2 font-medium transition hover:bg-blue-700"
        >
          <SendHorizontal size={18} />

          Post
        </button>

      </div>

      {/* ================= Logic ================= */}

      {/* 
          text state
          image state

          handleImageUpload()

          handleCreatePost()

          loading

          image preview

          API Call
      */}

    </div>
  );
}