const SavedPosts = ({ posts = [] }) => {
  if (posts.length === 0) {
    return (
      <div className="py-8 sm:py-12 text-center text-xs sm:text-sm text-zinc-500">
        No saved posts.
      </div>
    );
  }

  return (
    <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-5 w-full max-w-xl mx-auto">
      {posts.map((post) => (
        <div key={post._id} className="w-full">
          {/* <PostCard post={post} /> */}
        </div>
      ))}
    </div>
  );
};

export default SavedPosts;