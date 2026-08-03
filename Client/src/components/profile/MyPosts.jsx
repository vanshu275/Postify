const MyPosts = ({ posts = [] }) => {
  if (posts.length === 0) {
    return (
      <div className="py-12 text-center text-zinc-500">
        No posts yet.
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-5">
      {posts.map((post) => (
        <div key={post._id}>
          {/* <PostCard post={post} /> */}
        </div>
      ))}
    </div>
  );
};

export default MyPosts;