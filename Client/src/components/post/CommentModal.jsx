import { Modal } from "@mantine/core";
import { useEffect, useState } from "react";
import { getCommentsApi, commentPostApi } from "../../api/postApi";

export default function CommentModal({ post, opened, onClose }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!opened) return;

    const fetchComments = async () => {
      try {
        const res = await getCommentsApi(post._id);
        setComments(res.comments);
      } catch (error) {
        console.log(error);
      }
    };

    fetchComments();
  }, [opened, post._id]);

  const handleComment = async () => {
    if (!content.trim()) return;

    try {
      setLoading(true);

      const res = await commentPostApi(post._id, {
        content,
      });

      setComments((prev) => [res.comment, ...prev]);
      setContent("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="90%"
      centered
      title={`${post.user?.username}'s post`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[70vh]">

        {/* Left - Post */}
        <div className="flex flex-col">
          {post.image && (
            <img
              src={post.image}
              alt="Post"
              className="w-full max-h-[500px] object-contain rounded-lg"
            />
          )}

          <p className="mt-4 text-zinc-200">
            <span className="font-semibold">
              {post.user?.username}
            </span>{" "}
            {post.content}
          </p>
        </div>

        {/* Right - Comments */}
        <div className="flex flex-col">

          <div className="flex-1 overflow-y-auto space-y-4">
            {comments.length === 0 ? (
              <div className="h-full flex items-center justify-center text-zinc-500">
                No comments yet.
              </div>
            ) : (
              comments.map((comment) => (
                <div key={comment._id}>
                  <p className="font-semibold">
                    {comment.user?.username}
                  </p>

                  <p className="text-zinc-400">
                    {comment.content}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Input */}
          <div className="flex gap-2 mt-4 border-t pt-4">
            <input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleComment();
              }}
              placeholder="Add a comment..."
              className="flex-1 rounded-lg bg-zinc-800 px-4 py-2 text-white outline-none"
            />

            <button
              onClick={handleComment}
              disabled={loading}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white"
            >
              {loading ? "..." : "Post"}
            </button>
          </div>

        </div>
      </div>
    </Modal>
  );
}