import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getProfile } from "../api/profileApi";
import { getUserPosts } from "../api/postApi";

import UserHeader from "../components/user/UserHeader";
import UserTabs from "../components/user/UserTabs";
import MyPosts from "../components/profile/MyPosts";
import SavedPosts from "../components/profile/SavedPosts";

const User = () => {
  const { username } = useParams();

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("posts");

  useEffect(() => {
  const fetchData = async () => {
    const [userRes, postRes] = await Promise.all([
      getProfile(username),
      getUserPosts(username),
    ]);
    setUser(userRes.data);
    setPosts(postRes.data);
  };

  fetchData();
}, [username]);


  if (!user) {
    return (
      <div className="py-20 text-center text-zinc-400">
        Loading Profile...
      </div>
    );
  }

  return (
    <div>
      <UserHeader user={user} />

      <UserTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {activeTab === "posts" && <MyPosts posts={posts} />}

      {activeTab === "saved" && <SavedPosts />}
    </div>
  );
};

export default User;