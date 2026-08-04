 const UserTabs = ({ activeTab, setActiveTab }) => {
  return (
  <div className="mt-6 sm:mt-10 flex border-b border-zinc-800 w-full max-w-xl mx-auto overflow-x-auto no-scrollbar">
    <button
      type="button"
      onClick={() => setActiveTab("posts")}
      className={
        activeTab === "posts"
          ? "border-b-2 border-blue-500 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white whitespace-nowrap transition"
          : "px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base text-zinc-400 hover:text-zinc-200 whitespace-nowrap transition"
      }
    >
      Posts
    </button>

    <button
      type="button"
      onClick={() => setActiveTab("saved")}
      className={
        activeTab === "saved"
          ? "border-b-2 border-blue-500 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white whitespace-nowrap transition"
          : "px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base text-zinc-400 hover:text-zinc-200 whitespace-nowrap transition"
      }
    >
      Saved
    </button>
  </div>
);
};

export default UserTabs;