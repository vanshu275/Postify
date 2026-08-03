 const ProfileTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="mt-10 flex border-b border-zinc-800">
      <button
        onClick={() => setActiveTab("posts")}
        className={
          activeTab === "posts"
            ? "border-b-2 border-blue-500 px-5 py-3 font-semibold text-white"
            : "px-5 py-3 text-zinc-400"
        }
      >
        Posts
      </button>

      <button
        onClick={() => setActiveTab("saved")}
        className={
          activeTab === "saved"
            ? "border-b-2 border-blue-500 px-5 py-3 font-semibold text-white"
            : "px-5 py-3 text-zinc-400"
        }
      >
        Saved
      </button>
    </div>
  );
};

export default ProfileTabs;