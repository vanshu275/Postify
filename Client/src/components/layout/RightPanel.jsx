import { Search, TrendingUp } from "lucide-react";

export default function RightPanel() {
  return (
    <aside className="sticky top-0 hidden h-screen w-80 border-l border-zinc-800 bg-zinc-950 p-6 xl:block">

      {/* ================= SEARCH ================= */}

      <div className="relative mb-8">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
        />

        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500"
        />

        {/* Search Logic */}

      </div>

      {/* ================= TRENDING ================= */}

      <section className="mb-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">

        <div className="mb-5 flex items-center gap-2">

          <TrendingUp size={20} />

          <h2 className="text-lg font-semibold">
            Trending
          </h2>

        </div>

        <div className="space-y-5">

          {/* API Data */}

          <div className="cursor-pointer">
            <p className="font-medium">
              #React
            </p>

            <p className="text-sm text-zinc-500">
              12.5k Posts
            </p>
          </div>

          <div className="cursor-pointer">
            <p className="font-medium">
              #JavaScript
            </p>

            <p className="text-sm text-zinc-500">
              9.2k Posts
            </p>
          </div>

          <div className="cursor-pointer">
            <p className="font-medium">
              #WebDevelopment
            </p>

            <p className="text-sm text-zinc-500">
              7.1k Posts
            </p>
          </div>

          <div className="cursor-pointer">
            <p className="font-medium">
              #MERN
            </p>

            <p className="text-sm text-zinc-500">
              5.8k Posts
            </p>
          </div>

        </div>

      </section>

      {/* ================= SUGGESTED USERS ================= */}

      <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">

        <h2 className="mb-5 text-lg font-semibold">
          Suggested Users
        </h2>

        <div className="space-y-5">

          {/* Backend Users */}

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">

                <div className="h-11 w-11 rounded-full bg-zinc-700" />

                <div>

                  <p className="font-medium">
                    Username
                  </p>

                  <p className="text-sm text-zinc-500">
                    @username
                  </p>

                </div>

              </div>

              <button
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium transition hover:bg-blue-700"
              >
                Follow
              </button>

            </div>
          ))}

        </div>

      </section>

    </aside>
  );
}