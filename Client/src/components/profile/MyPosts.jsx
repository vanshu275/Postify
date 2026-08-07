import { useState } from "react";
import { Modal } from "@mantine/core";
import PostCard from "../post/PostCard";

const MyPosts = ({ posts = [] }) => {
  const [opened, setOpened] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleOpen = (post) => {
    setSelectedPost(post);
    setOpened(true);
  };

  if (posts.length === 0) {
    return (
      <div className="py-12 text-center text-sm text-zinc-500">
        No posts yet.
      </div>
    );
  }

  return (
    <>
      {/* Grid */}
      <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-2 mb-3 mr-2 ml-2">
        {posts.map((post) => (
          <button
            key={post._id}
            onClick={() => handleOpen(post)}
            className="group relative aspect-square overflow-hidden bg-zinc-900"
          >

            <img
              src={post.image}
              alt="Post"
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {/* Modal */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        centered
        size="lg"
        withCloseButton={false}
        padding={0}
        radius={0}
        shadow="none"
        styles={{
          content: {
            background: "transparent",
            overflow: "hidden",
          },
          body: {
            padding: 0,
          },
        }}
      >
        {selectedPost && <PostCard post={selectedPost} />}
      </Modal>
    </>
  );
};

export default MyPosts;