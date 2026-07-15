import { useState } from "react"

export default function Create() {
  const [text, setText] = useState("")

  const handlePost = async () => {
    const token = localStorage.getItem("token")
    try {
      const res = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text }),
      })

      const data = await res.json()
      console.log(data)

      setText("")
    } catch (error) {
      console.log("Error:", error)
    }
  }

  return (
    <div className="p-6 text-white">
      <h1 className="mb-4 text-2xl">Create Post</h1>

      <input
        className="w-full border p-2 text-white"
        placeholder="What's on your mind?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={handlePost}
        className="mt-3 rounded bg-blue-500 px-4 py-2"
      >
        Post
      </button>
    </div>
  )
}
