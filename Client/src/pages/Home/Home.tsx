import { useEffect, useState } from "react"
import type { Post } from "@/types/post"

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/posts")
        const data = await res.json()
        setPosts(data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchPosts()
  }, [])

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl mb-8 fixed bg-[#0C0A09] w-full p-3  top-0">Feed</h1>

      {posts.map((post) => (
        <div
          key={post._id}
          className="mb-4 mt-9 p-4 border border-gray-700 rounded"
        >
          <p className="text-sm text-gray-400">
            @{post.user.username}
          </p>

          <p className="mt-1">{post.text}</p>
        </div>
      ))}
    </div>
  )
}

export default Home