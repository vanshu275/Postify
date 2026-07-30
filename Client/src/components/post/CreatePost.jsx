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
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's happening?"
        rows={5}
        className="w-full resize-none rounded-xl border border-zinc-800 bg-zinc-950 p-4 outline-none transition focus:border-blue-500"
      />


      <div className="mt-5 flex items-center justify-between">

        <div className="flex items-center gap-3">

          {/* Upload Image */}

          <button
            onClick={() => fileInputRef.current.click()}
            className="rounded-lg p-2 transition hover:bg-zinc-800"
          >
            <ImagePlus size={22} />
          </button>

          {/* Hidden File Input */}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setImage(e.target.files[0])}
          />

        </div>

        {/* Submit */}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2 font-medium transition hover:bg-blue-700 disabled:opacity-50"
        >
          <SendHorizontal size={18} />

          {loading ? "Posting..." : "Post"}
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